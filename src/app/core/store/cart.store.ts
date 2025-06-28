import { Injectable, signal } from '@angular/core';
import { Cart } from '../../shared/models/cart.model';

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
    this._cart.set(null);
    this._cartItemsQuantity.set(0);
  }

  removeItem(productId: string): void {
    const currentCart = this._cart();
    if (!currentCart) return;

    const updatedItems = currentCart.items.filter(item => item.id !== productId);


    if (updatedItems.length === 0) {
      this.clearCart();
      return;
    }

    const updatedCart: Cart = {
      ...currentCart,
      items: updatedItems,
    };

    this._cart.set({ ...updatedCart, items: [...updatedItems] });

    const newQuantity = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
    this._cartItemsQuantity.set(newQuantity);
  }

  setCartItemsQuantity(cartItemsQuantity: number) {
    this._cartItemsQuantity.set(cartItemsQuantity);
  }

  clearCartItemsQuantity() {
    this._cartItemsQuantity.set(0);
  }
}
