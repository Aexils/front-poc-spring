import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../../categories/services/category.service';
import { Category } from '../../models/category.model';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './product-form.component.html',
})
export class ProductFormComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);

  productId: string | null = null;
  categories = signal<Category[]>([]);
  mainImageUrl = signal('');
  imageFile: File | null = null;

  form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    slug: [''],
    description: [''],
    price: [0, [Validators.required, Validators.min(0)]],
    active: [true],
    categoryId: ['', Validators.required],
    newCategory: this.fb.control(''),
  });

  async ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id');

    // Charger les catégories
    firstValueFrom(this.categoryService.getAll()).then((cats) => {
      this.categories.set(cats);
    });

    // Pré-remplir si modification
    if (this.productId) {
      let product = firstValueFrom(await this.productService.getOne(this.productId))
      if (product) {
        this.form.patchValue(await product);
        // TODO: si tu as un champ `mainImageUrl` en base
        // this.mainImageUrl.set(product.mainImageUrl || '');
      }
    }

    // Générer automatiquement le slug
    this.form.controls.name.valueChanges.subscribe((name) => {
      this.form.controls.slug.setValue(this.slugify(name || ''));
    });
  }

  async onSubmit() {
    if (!this.form.valid) return;

    const data = {
      ...this.form.getRawValue(),
      mainImageUrl: this.mainImageUrl(),
    };

    if (this.productId) {
      await firstValueFrom(await this.productService.update(this.productId, data));
    } else {
      await firstValueFrom(await this.productService.create(data));
    }

    await this.router.navigate(['/admin/products']);
  }

  async createCategory() {
    const name = this.form.controls.newCategory.value?.trim();
    if (!name) return;

    const created = await firstValueFrom(await this.categoryService.create({name}));
    this.categories.update((list) => [...list, created]);
    this.form.controls.categoryId.setValue(created.id);
    this.form.controls.newCategory.setValue('');
  }

  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.imageFile = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.mainImageUrl.set(reader.result as string);
      };
      reader.readAsDataURL(this.imageFile);
    }
  }

  private slugify(text: string): string {
    return text
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]/g, '');
  }
}
