import {AuthStore} from '../store/auth.store';
import {inject, Injectable} from '@angular/core';
import { AuthService as Auth0Service } from '@auth0/auth0-angular';
import {firstValueFrom} from 'rxjs';
import {User} from '../../shared/models/user.model';
import {HttpClient} from '@angular/common/http';
import {CartStore} from '../store/cart.store';
import {environment} from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth0 = inject(Auth0Service)
  private store = inject(AuthStore)
  private cartStore = inject(CartStore)
  private http = inject(HttpClient)

  async register() {
    const idTokenClaims = await firstValueFrom(this.auth0.idTokenClaims$);

    const token = (idTokenClaims as any)?.__raw;

    if (!token) throw new Error('No ID token received');

    const user = await firstValueFrom(
      this.http.post<User>(`${environment.apiUrl}/auth/me`, null, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    );

    this.store.setUser(user);
  }

  async getCurrentUser(): Promise<void> {
    let token: string | null = null;

    try {
      token = await firstValueFrom(this.auth0.getAccessTokenSilently());
    } catch {
      return;
    }

    if (!token) return;

    const user = await firstValueFrom(this.http.get<User>(`${environment.apiUrl}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` }}))

    this.store.setUser({
      id: user.id,
      email: user.email,
      name: user.name,
      picture: user.picture,
      role: user.role,
      active: user.active
    });

    this.cartStore.setCart(user.cart);
    this.store.setCustomer(user.customer);
  }
}
