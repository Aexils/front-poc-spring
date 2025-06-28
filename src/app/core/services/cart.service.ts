import {inject, Injectable} from '@angular/core';
import {AuthService as Auth0Service} from '@auth0/auth0-angular';
import {firstValueFrom} from 'rxjs';
import {Cart, CartItem} from '../../shared/models/cart.model';
import {HttpClient} from '@angular/common/http';
import {CartStore} from '../store/cart.store';

@Injectable({providedIn: 'root'})
export class CartService {
  private auth0 = inject(Auth0Service)
  private http = inject(HttpClient);
  private cartStore = inject(CartStore)

  private readonly baseUrl = 'http://localhost:8080/cart';

  async getOrCreateCartForUser(): Promise<void> {
    let token: string | null = null;

    try {
      token = await firstValueFrom(this.auth0.getAccessTokenSilently());
    } catch {
      // Pas connecté ou token expiré : on ne fait rien
      return;
    }

    if (!token) return;

    const cart = await firstValueFrom(
      this.http.get<Cart>(this.baseUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
    );

    this.cartStore.setCart(cart);
  }

  async addItemToCart(cartItem: Partial<CartItem>): Promise<Cart> {
    const token = await firstValueFrom(this.auth0.getAccessTokenSilently());

    const cart = await firstValueFrom(this.http.post<Cart>(`${this.baseUrl}/items`,
      cartItem,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    ));

    if (cartItem.quantity)
      this.cartStore.setCartItemsQuantity(this.cartStore.cartItemsQuantity() + cartItem.quantity)

    this.cartStore.setCart(cart)

    return cart;
  }

  async deleteItemCart(cartItemId: string): Promise<void> {
    const token = await firstValueFrom(this.auth0.getAccessTokenSilently());

    await firstValueFrom(this.http.delete<Cart>(`${this.baseUrl}/items/${cartItemId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    ));
  }
}
