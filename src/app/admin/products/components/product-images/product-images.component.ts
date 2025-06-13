import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {ProductImage} from '../../models/product.model';
import {ProductService} from '../../services/product.service';

@Component({
  selector: 'app-product-images',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-images.component.html',
})
export class ProductImagesComponent implements OnInit {
  @Input() productId!: string;
  private service = inject(ProductService);

  images: ProductImage[] = [];
  newImage: Partial<ProductImage> = { url: '', isMain: false };

  ngOnInit() {
    this.load();
  }

  load() {
    this.service.getImages(this.productId).subscribe(imgs => (this.images = imgs));
  }

  add() {
    if (!this.newImage.url) return;
    this.service.addImage(this.productId, this.newImage).subscribe(() => {
      this.newImage = { url: '', isMain: false };
      this.load();
    });
  }

  remove(id: string) {
    this.service.deleteImage(id).subscribe(() => this.load());
  }
}
