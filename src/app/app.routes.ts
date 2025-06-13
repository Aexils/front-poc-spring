import { Routes } from '@angular/router';
import { adminGuard } from './core/guards/admin.guard';
import { Unauthorized } from './shared/components/unauthorized/unauthorized';
import {DashboardComponent} from './admin/dashboard/dashboard';
import {UsersComponent} from './admin/users/users';
import {Register} from './shared/components/header/navbar/auth/register';
import {productsRoutes} from './admin/products/products.routes';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'register', component: Register
      },
      {
        path: 'admin',
        canActivate: [adminGuard],
        children: [
          { path: 'dashboard', component: DashboardComponent },
          { path: 'users', component: UsersComponent },
          {
            path: 'products',
            children: productsRoutes
          },
        ]
      },
      {
        path: 'unauthorized',
        component: Unauthorized
      },
    ]
  }
];
