import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {firstValueFrom, Observable, Subject} from 'rxjs';
import {Category} from '../../shared/models/category.model';
import {CategoryStore} from '../store/category.store';

@Injectable({providedIn: 'root'})
export class CategoryService {
  private http = inject(HttpClient)
  private categoryStore = inject(CategoryStore)
  private API = 'http://localhost:8080/admin/categories'

  async getAll(): Promise<void> {
    const categories = await firstValueFrom(this.http.get<Category[]>(this.API))
    this.categoryStore.setCategories(categories)
  }
}
