import { Routes } from '@angular/router';
import {UsersComponent} from './users/components/user-list/user-list.component';
import {DashboardComponent} from './dashboard/components/dashboard.component';
import {ProductListComponent} from './products/components/product-list/product-list.component';
import {AdminLayoutComponent} from './layout/components/layout.component';
import {productsRoutes} from './products/products.routes';


export const adminRoutes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'users', component: UsersComponent },
      { path: 'products', children: productsRoutes},
    ]
  }
];
