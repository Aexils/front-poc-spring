import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../../../../admin/products/services/product.service';
import {ProductDTO} from '../../../../shared/models/product.model';
import {CurrencyPipe} from '@angular/common';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  styleUrl: 'product-detail.component.scss',
  templateUrl: 'product-detail.component.html',
  imports: [
    CurrencyPipe
  ],
})
export class ProductDetailComponent implements OnInit{
  private route = inject(ActivatedRoute)
  private productService = inject(ProductService)

  product!: ProductDTO;

  async ngOnInit(): Promise<void> {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug)
      this.product = await this.productService.getOne(slug);
  }

}
