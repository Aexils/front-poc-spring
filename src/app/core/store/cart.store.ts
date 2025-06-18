import { Injectable, signal } from '@angular/core';
import {Cart} from '../../shared/models/cart.model';

@Injectable({ providedIn: 'root' })
export class CartStore {
  private readonly _cart = signal<Cart | null>(null);
  readonly cart = this._cart.asReadonly();
  private readonly _cartItemsQuantity = signal<number>(0);
  readonly cartItemsQuantity = this._cartItemsQuantity.asReadonly();

  setCart(cart: Cart): void {
    this._cart.set(cart);
  }

  clearCart(): void {
    this._cartItemsQuantity.set(0);
  }

  setCartItemsQuantity(cartItemsQuantity: number) {
    this._cartItemsQuantity.set(cartItemsQuantity);
  }

  clearCartItemsQuantity() {
    this._cartItemsQuantity.set(0);
  }
}
