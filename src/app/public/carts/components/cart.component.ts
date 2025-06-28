import {Component, inject, OnInit} from '@angular/core';
import {CartService} from '../../../core/services/cart.service';
import {CartStore} from '../../../core/store/cart.store';
import {CartItem} from '../../../shared/models/cart.model';
import {CurrencyPipe, KeyValuePipe} from '@angular/common';
import {AuthStore} from '../../../core/store/auth.store';

@Component({
  selector: 'app-public-carts',
  standalone: true,
  styleUrl: 'cart.component.scss',
  templateUrl: 'cart.component.html',
  imports: [
    KeyValuePipe,
    CurrencyPipe
  ],
})
export class CartComponent implements OnInit {
  cartService = inject(CartService)
  cartStore = inject(CartStore)
  user = inject(AuthStore).user

  groupedItems: { [category: string]: CartItem[] } = {};

  async ngOnInit() {
    await this.cartService.getOrCreateCartForUser()
    this.groupCartItemsByCategory(this.cartStore.cart()?.items);
  }

  groupCartItemsByCategory(cartItems: CartItem[] | undefined) {
    if (cartItems && cartItems.length > 0) {
      for (const item of cartItems) {
        const category = item.product?.categoryName ?? 'Toutes catégories';
        if (!this.groupedItems[category]) {
          this.groupedItems[category] = [];
        }
        this.groupedItems[category].push(item);
      }
    }
  }
}


