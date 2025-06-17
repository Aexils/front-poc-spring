export interface User {
  id: string;
  email: string;
  name: string;
  picture: string;
  role: UserRole;
  active: boolean;
}

export enum UserRole {
  GUEST = 'GUEST',
  CUSTOMER = 'CUSTOMER',
  ADMIN = 'ADMIN'
}

