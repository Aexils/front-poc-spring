import { Routes } from '@angular/router';
import { adminGuard } from './core/guards/admin.guard';
import { Unauthorized } from './core/components/unauthorized/unauthorized';
import {DashboardComponent} from './admin/dashboard/components/dashboard.component';
import {productsRoutes} from './admin/products/products.routes';
import {adminRoutes} from './admin/admin.routes';
import {RegisterRedirectComponent} from './core/components/register-redirect/register-redirect.component';
import {HomePageComponent} from './public/home/components/home-page/home-page.component';
import {ProductDetailComponent} from './public/products/component/product-detail/product-detail.component';
import {CartComponent} from './public/carts/components/cart.component';
import {profileRoutes} from './profile/profile.routes';

export const routes: Routes = [
  {
    path: '', component: HomePageComponent
  },
  {
    path: 'cart', component: CartComponent
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
      { path: '', children: adminRoutes },
    ]
  },
  {
    path: 'profile',
    children: [
      { path: '', children: profileRoutes}
    ]
  }
];
