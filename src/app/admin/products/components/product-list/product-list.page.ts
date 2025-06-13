import { Component, effect, signal } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import {RouterLink} from '@angular/router';
import {CurrencyPipe, NgClass, NgForOf} from '@angular/common';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable
} from '@angular/material/table';

@Component({
  selector: 'app-product-list-page',
  standalone: true,
  templateUrl: './product-list.page.html',
  imports: [
    RouterLink,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    MatRowDef,
    NgClass,
    MatTable,
    CurrencyPipe
  ],
  styleUrl: './product-list.page.scss'
})
export class ProductListPage {
  products = signal<Product[]>([]);

  displayedColumns: string[] = [
    'name',
    'slug',
    'price',
    'category',
    'active',
    'actions'
  ];

  constructor(private productService: ProductService) {
    this.loadProducts();
  }

  async loadProducts() {
    this.products.set(await this.productService.getAll());
  }

  async deleteProduct(id: string) {
    await this.productService.delete(id)
    this.loadProducts()
  }


}
