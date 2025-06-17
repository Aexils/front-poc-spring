import {Component, inject, OnInit} from '@angular/core';
import {ProductService} from '../../../../admin/products/services/product.service';
import {Product} from '../../../../shared/models/product.model';
import {CurrencyPipe, JsonPipe} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-public-product-list',
  standalone: true,
  styleUrl: 'product-list.component.scss',
  templateUrl: 'product-list.component.html',
  imports: [
    CurrencyPipe,
    RouterLink
  ],
})
export class ProductListComponent implements OnInit {
  private productService = inject(ProductService)
  products: Product[] = []

  async ngOnInit() {
    this.products = await this.productService.getAll()
  }

  getLowestVariantPrice(product: Product): number | null {
    if (!product || !product.variants) return null;

    const prices = product.variants
      .filter(v => v.priceOverride != null && v.priceOverride < product.price)
      .map(v => v.priceOverride);

    return prices.length ? Math.min(...prices) : null;
  }
}


