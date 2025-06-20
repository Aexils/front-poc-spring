import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {firstValueFrom, Observable} from 'rxjs';
import {Category} from '../../../shared/models/category.model';
import {AuthService as Auth0Service} from '@auth0/auth0-angular';

@Injectable({providedIn: 'root'})
export class CategoryService {
  private http = inject(HttpClient);
  private auth0 = inject(Auth0Service)
  private API = 'http://localhost:8080';

  async getAll(): Promise<Category[]> {
    return await firstValueFrom(this.http.get<Category[]>(`${this.API}/categories`));
  }

  async create(dto: Partial<Category>): Promise<Observable<Category>> {
    const token = await firstValueFrom(this.auth0.getAccessTokenSilently());

    return this.http.post<Category>(`${this.API}/admin/categories`, {
        name: dto.name,
        slug: this.slugify(dto.name || ''),
        parentId: dto.parentId ?? null
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
  }

  private slugify(text: string): string {
    return text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]/g, '');
  }
}
