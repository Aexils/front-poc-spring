import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../../categories/services/category.service';
import { Category } from '../../../../shared/models/category.model';
import { firstValueFrom } from 'rxjs';
import { DynamicAttributeTemplate } from '../../../../shared/models/dynamic-attribute-template.model';
import { DynamicAttributeTemplateService } from '../../../../core/services/dynamic-attribute-template.service';
import {
  Product,
  ProductCreatePayload,
  ProductDTO,
  ProductImage,
  ProductVariant
} from '../../../../shared/models/product.model';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-products-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './product-form.component.html',
})
export class ProductFormComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);
  private dynamicAttributeTemplateService = inject(DynamicAttributeTemplateService);

  productSlug: string | null = null;
  productId: string | null = null;
  categories = signal<Category[]>([]);
  attributeTemplates: DynamicAttributeTemplate[] = [];

  variants: ProductVariant[] = [];

  form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    slug: [''],
    description: [''],
    price: [0, [Validators.required, Validators.min(0)]],
    active: [true],
    categoryId: ['', Validators.required],
    newCategory: this.fb.control(''),
    attributes: this.fb.array([]),
    variants: this.fb.array([]),
  });

  selectedImages: File[] = [];
  imagePreviews: string[] = [];
  images: ProductImage[] = [];
  mainImageIndex: number = 0;

  async ngOnInit() {
    this.productSlug = this.route.snapshot.paramMap.get('slug');

    const cats = await firstValueFrom(this.categoryService.getAll());
    this.categories.set(cats);

    this.form.get('categoryId')!.valueChanges.subscribe((categoryId: string) => {
      const selected = this.categories().find(c => c.id === categoryId);
      if (selected) {
        this.onCategoryChange(selected.name);
      }
    });

    this.form.controls.name.valueChanges.subscribe(name => {
      this.form.controls.slug.setValue(this.slugify(name || ''));
    });

    if (this.productSlug) {
      const product: ProductDTO = await this.productService.getOne(this.productSlug);
      if (product) {
        this.productId = product.id;
        this.form.patchValue(product);
        if (product.categoryName) {
          await this.onCategoryChange(product.categoryName);
          if (product.attributes) {
            const attributesFormArray = this.form.get('attributes') as FormArray;

            // Vider d'abord les anciens champs (précaution)
            attributesFormArray.clear();

            product.attributes.forEach(attr => {
              attributesFormArray.push(this.fb.group({
                name: [attr.name],
                value: [attr.value],
                type: [attr.type],
              }));
            });
          }
          if (product.attributes) {
            const attributesFormArray = this.form.get('attributes') as FormArray;

            // Vider d'abord les anciens champs (précaution)
            attributesFormArray.clear();

            product.attributes.forEach(attr => {
              attributesFormArray.push(this.fb.group({
                name: [attr.name],
                value: [attr.value],
                type: [attr.type],
              }));
            });
          }
        }
        if (product.variants) {
          const variantsFormArray = this.form.get('variants') as FormArray;

          variantsFormArray.clear();

          product.variants.forEach(variant => {
            variantsFormArray.push(this.fb.group({
              variantName: [variant.variantName],
              priceOverride: [variant.priceOverride],
              stock: [variant.stock],
              active: [variant.active],
            }));
          });
        }
      }
      for (const image of product.images) {
        this.images.push(<ProductImage>image)
      }
    }
  }

  async onCategoryChange(categoryName: string) {
    const templates = await this.dynamicAttributeTemplateService.getDynamicAttributeByCategoryName(categoryName);
    this.attributeTemplates = templates;

    const attributesFormArray = this.form.get('attributes') as FormArray;
    attributesFormArray.clear();

    templates.forEach(attr => {
      attributesFormArray.push(this.fb.group({
        name: [attr.name],
        value: [''],
        type: [attr.type],
      }));
    });
  }

  onImageFilesSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;

    this.selectedImages = Array.from(input.files);

    this.selectedImages.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        this.images.push({ url: reader.result as string, isLocal: true } as ProductImage);
      };
      reader.readAsDataURL(file);
    });
  }

  async onSubmit() {
    if (!this.form.valid) return;

    const rawValue = this.form.getRawValue();

    const data: ProductCreatePayload = {
      name: rawValue.name,
      slug: rawValue.slug,
      description: rawValue.description,
      price: rawValue.price,
      active: rawValue.active,
      categoryId: rawValue.categoryId,
      attributes: (rawValue.attributes as any[]).map(attr => ({
        name: attr.name,
        value: attr.value,
        type: attr.type,
        productId: '',
        id: '',
      })),
      variants: (this.form.getRawValue().variants as any[]).map(v => ({
        variantName: v.variantName,
        priceOverride: v.priceOverride,
        stock: v.stock,
        active: v.active,
      })),
    };

    // 🔁 Création ou modification du produit
    if (!this.productId) {
      const created = await firstValueFrom(await this.productService.create(data));
      this.productId = created.id;
    } else {
      await firstValueFrom(await this.productService.update(this.productId, data));
    }

    // ✅ Upload des images dans les deux cas
    if (this.productId && this.selectedImages.length > 0) {
      const uploads = this.selectedImages.map((file, index) =>
        firstValueFrom(this.productService.addImage(
          this.productId!,
          file,
          index === this.mainImageIndex
        ))
      );

      await Promise.all(uploads);

      // Reset des images après upload
      this.selectedImages = [];
      this.imagePreviews = [];
      this.mainImageIndex = 0;
    }

    await this.router.navigate(['admin/products']);
  }


  async createCategory() {
    const name = this.form.controls.newCategory.value?.trim();
    if (!name) return;

    const created = await firstValueFrom(await this.categoryService.create({ name }));
    this.categories.update((list) => [...list, created]);
    this.form.controls.categoryId.setValue(created.id);
    this.form.controls.newCategory.setValue('');
  }

  async removeImage(index: number, image: ProductImage) {
    this.selectedImages.splice(index, 1);
    this.images.splice(index, 1);
    if (this.mainImageIndex === index)
      this.mainImageIndex = 0;
    if (image.id)
      await this.productService.deleteImage(image.id)
  }

  private slugify(text: string): string {
    return text
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]/g, '');
  }

  get variantsArray(): FormArray {
    return this.form.get('variants') as FormArray;
  }

  addVariantFormGroup() {
    this.variantsArray.push(this.fb.group({
      variantName: ['', Validators.required],
      priceOverride: [0],
      stock: [0],
      active: [true],
    }));
  }

  removeVariantFormGroup(index: number) {
    this.variantsArray.removeAt(index);
  }

  async onMainImageChange(index: number) {
    const selected = this.images[index];

    if (selected.isMain) return;

    this.images.forEach(img => img.isMain = false);
    selected.isMain = true;
    this.mainImageIndex = index;

    if (selected.id) {
      await this.productService.setMainImage(this.productId!, selected.id);
    }
  }

}
