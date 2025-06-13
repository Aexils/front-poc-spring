import { Routes } from '@angular/router';
import { ProductListPage } from './components/product-list/product-list.page';
import {ProductFormComponent} from './components/product-form/product-form.component';


export const productsRoutes: Routes = [
  { path: '', component: ProductListPage },
  { path: 'create', component: ProductFormComponent },
  { path: 'edit/:id', component: ProductFormComponent },
];
