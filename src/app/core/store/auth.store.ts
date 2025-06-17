import { Injectable, signal } from '@angular/core';
import { User } from '../../shared/models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthStore {
  private readonly _user = signal<User | null>(null);
  readonly user = this._user.asReadonly();

  setUser(user: User) {
    this._user.set(user);
  }

  clearUser() {
    this._user.set(null);
  }
}
