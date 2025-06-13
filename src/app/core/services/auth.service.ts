import {AuthStore} from '../store/auth.store';
import {Injectable} from '@angular/core';
import { AuthService as Auth0Service } from '@auth0/auth0-angular';
import {firstValueFrom} from 'rxjs';
import {User} from '../models/user.model';
import {HttpClient} from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private auth0: Auth0Service, private store: AuthStore, private http: HttpClient) {}

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

  logout() {
    this.auth0.logout({ logoutParams: { returnTo: window.location.origin } });
    this.store.clearUser();
  }

  login() {
    this.auth0.loginWithRedirect();
  }

  signup() {
    this.auth0.loginWithRedirect({
      authorizationParams: {
        redirect_uri: `${window.location.origin}/register`,
        screen_hint: 'signup'
      }
    });
  }
}
