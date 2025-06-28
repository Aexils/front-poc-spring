import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {firstValueFrom, Observable, Subject} from 'rxjs';
import {Category} from '../../shared/models/category.model';
import {CategoryStore} from '../store/category.store';
import {environment} from '../../../environments/environment';

@Injectable({providedIn: 'root'})
export class CategoryService {
  private http = inject(HttpClient)
  private categoryStore = inject(CategoryStore)

  async getAll(): Promise<void> {
    const categories = await firstValueFrom(this.http.get<Category[]>(`${environment.apiUrl}/categories`))
    this.categoryStore.setCategories(categories)
  }
}
