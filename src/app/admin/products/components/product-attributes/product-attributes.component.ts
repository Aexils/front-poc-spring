import { Component, Input, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {ProductAttribute} from '../../models/product.model';
import {ProductService} from '../../services/product.service';

@Component({
  selector: 'app-product-attributes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-attributes.component.html',
})
export class ProductAttributesComponent implements OnInit {
  @Input() productId!: string;

  private service = inject(ProductService);

  attributes: ProductAttribute[] = [];
  newAttr: Partial<ProductAttribute> = { name: '', value: '', type: 'STRING' };

  ngOnInit() {
    this.load();
  }

  load() {
    this.service.getAttributes(this.productId).subscribe(a => (this.attributes = a));
  }

  add() {
    if (!this.newAttr.name || !this.newAttr.value) return;
    this.service.addAttribute(this.productId, this.newAttr).subscribe(() => {
      this.newAttr = { name: '', value: '', type: 'STRING' };
      this.load();
    });
  }

  remove(attrId: string) {
    this.service.deleteAttribute(attrId).subscribe(() => this.load());
  }
}
