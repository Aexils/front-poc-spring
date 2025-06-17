import { Routes } from '@angular/router';
import {ProductListComponent} from './components/product-list/product-list.component';
import {ProductFormComponent} from './components/product-form/product-form.component';


export const productsRoutes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'create', component: ProductFormComponent },
  { path: 'edit/:slug', component: ProductFormComponent },
];
