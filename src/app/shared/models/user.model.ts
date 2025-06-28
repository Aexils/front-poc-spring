import {Customer} from './customer.model';
import {Cart} from './cart.model';

export interface User {
  id: string;
  email: string;
  name: string;
  picture: string;
  role: UserRole;
  active: boolean;
  createdAt: Date;
  customer: Customer;
  cart: Cart;
}

export enum UserRole {
  GUEST = 'GUEST',
  CUSTOMER = 'CUSTOMER',
  ADMIN = 'ADMIN'
}
