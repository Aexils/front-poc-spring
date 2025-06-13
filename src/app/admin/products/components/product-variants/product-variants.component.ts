import {Component, Input, OnInit, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ProductService} from '../../services/product.service';
import {ProductVariant} from '../../models/product.model';

@Component({
  selector: 'app-product-variants',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-variants.component.html',
})
export class ProductVariantsComponent implements OnInit {
  @Input() productId!: string;
  private service = inject(ProductService);

  variants: ProductVariant[] = [];
  newVariant: Partial<ProductVariant> = {
    variantName: '',
    priceOverride: 0,
    stock: 0,
    active: true
  };

  ngOnInit() {
    this.load();
  }

  load() {
    this.service.getVariants(this.productId).subscribe(v => (this.variants = v));
  }

  add() {
    if (!this.newVariant.variantName) return;
    this.service.addVariant(this.productId, this.newVariant).subscribe(() => {
      this.newVariant = {
        variantName: '',
        priceOverride: 0,
        stock: 0,
        active: true
      };
      this.load();
    });
  }

  remove(id: string) {
    this.service.deleteVariant(id).subscribe(() => this.load());
  }
}
