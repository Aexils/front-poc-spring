import { Injectable, signal } from '@angular/core';
import { User } from '../../shared/models/user.model';
import {Cart} from '../../shared/models/cart.model';
import {Customer} from '../../shared/models/customer.model';

@Injectable({ providedIn: 'root' })
export class AuthStore {
  private readonly _user = signal<Partial<User> | null>(null);
  readonly user = this._user.asReadonly();

  private readonly _customer = signal<Customer | null>(null);
  readonly customer = this._customer.asReadonly();

  setUser(user: Partial<User>) {
    this._user.set(user);
  }

  setCustomer(customer: Customer) {
    this._customer.set(customer);
  }
}
