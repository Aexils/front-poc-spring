import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../../../../admin/products/services/product.service';
import {ProductDTO} from '../../../../shared/models/product.model';
import {CurrencyPipe} from '@angular/common';
import {Cart, CartItem} from '../../../../shared/models/cart.model';
import {CartService} from '../../../../core/services/cart.service';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthStore} from '../../../../core/store/auth.store';
import {ToastService} from '../../../../core/services/toast.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  styleUrl: 'product-detail.component.scss',
  templateUrl: 'product-detail.component.html',
  imports: [
    CurrencyPipe,
    ReactiveFormsModule
  ],
})
export class ProductDetailComponent implements OnInit{
  private route = inject(ActivatedRoute)
  private productService = inject(ProductService)
  private cartService = inject(CartService)
  private toast = inject(ToastService)
  private user = inject(AuthStore).user
  private fb = inject(FormBuilder);

  product!: ProductDTO;
  cart: Cart | null = null;
  form!: FormGroup;
  selectedVariant: any;

  async ngOnInit(): Promise<void> {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug)
      this.product = await this.productService.getOne(slug);
    this.initForm();
  }

  initForm(): void {
    const defaultVariant = this.product.variants[0];

    this.form = this.fb.group({
      variantId: [defaultVariant.id, Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
    });

    this.selectedVariant = defaultVariant;
  }

  getLowestVariantPrice(product: ProductDTO): number | null {
    if (!product || !product.variants) return null;

    const prices = product.variants
      .filter(v => v.priceOverride != null && v.priceOverride < product.price)
      .map(v => v.priceOverride);

    return prices.length ? Math.min(...prices) : null;
  }

  async onSubmit(): Promise<void> {
    if (this.user()) {
      if (this.form.valid) {
        const dto: Partial<CartItem> = {
          quantity: this.form.value.quantity,
          variantId: this.form.value.variantId
        };

        await this.cartService.getOrCreateCartForUser()
        await this.cartService.addItemToCart(dto)
        this.toast.show("Produit ajouté au panier", 'success')
      }
    }
    this.toast.show('Vous n\'êtes pas connecté(e)', 'warning')
  }

  onVariantChange(): void {
    const variantId = this.form.value.variantId;
    this.selectedVariant = this.product.variants.find(v => v.id === variantId);
  }

}
