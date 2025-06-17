import { Routes } from '@angular/router';
import { adminGuard } from './core/guards/admin.guard';
import { Unauthorized } from './core/components/unauthorized/unauthorized';
import {DashboardComponent} from './admin/dashboard/components/dashboard.component';
import {productsRoutes} from './admin/products/products.routes';
import {usersRoutes} from './admin/users/users.routes';
import {RegisterRedirectComponent} from './core/components/register-redirect/register-redirect.component';
import {HomePageComponent} from './public/home/components/home-page/home-page.component';
import {ProductDetailComponent} from './public/products/component/product-detail/product-detail.component';

export const routes: Routes = [
  {
    path: '', component: HomePageComponent
  },
  {
    path: 'product/:slug', component: ProductDetailComponent
  },
  {
    path: 'register', component: RegisterRedirectComponent
  },
  {
    path: 'unauthorized', component: Unauthorized
  },
  {
    path: 'admin',
    canActivate: [adminGuard],
    children: [
      { path: '', component: DashboardComponent },
      { path: 'users', children: usersRoutes },
      { path: 'products', children: productsRoutes},
    ]
  }
];
