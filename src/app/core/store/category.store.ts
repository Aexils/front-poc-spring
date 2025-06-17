import { Injectable, signal } from '@angular/core';
import {Category} from '../../shared/models/category.model';

@Injectable({ providedIn: 'root' })
export class CategoryStore {
  private readonly _categories = signal<Category[] | null>(null);
  readonly categories = this._categories.asReadonly();

  setCategories(categories: Category[]) {
    this._categories.set(categories);
  }

  clearCategories() {
    this._categories.set(null);
  }
}
