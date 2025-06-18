import {AuthStore} from '../store/auth.store';
import {inject, Injectable} from '@angular/core';
import { AuthService as Auth0Service } from '@auth0/auth0-angular';
import {firstValueFrom} from 'rxjs';
import {User} from '../../shared/models/user.model';
import {HttpClient} from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth0 = inject(Auth0Service)
  private store = inject(AuthStore)
  private http = inject(HttpClient)

  async register() {
    const idTokenClaims = await firstValueFrom(this.auth0.idTokenClaims$);

    const token = (idTokenClaims as any)?.__raw;

    if (!token) throw new Error('No ID token received');

    const user = await firstValueFrom(
      this.http.post<User>('http://localhost:8080/auth/me', null, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    );

    this.store.setUser(user);
  }

  async getCurrentUser(): Promise<void> {
    const token = await firstValueFrom(this.auth0.getAccessTokenSilently());

    const user = await firstValueFrom(this.http.get<User>('http://localhost:8080/auth/me', {
      headers: { Authorization: `Bearer ${token}` }}))

    this.store.setUser(user)
  }
}
