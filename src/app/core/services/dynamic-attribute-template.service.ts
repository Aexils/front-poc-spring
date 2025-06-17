import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DynamicAttributeTemplate} from '../../shared/models/dynamic-attribute-template.model';
import {firstValueFrom, Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class DynamicAttributeTemplateService {
  private http = inject(HttpClient)
  private API = 'http://localhost:8080'

  async getDynamicAttributeByCategoryName(categoryName: string): Promise<DynamicAttributeTemplate[]> {
    return await firstValueFrom(this.http.get<DynamicAttributeTemplate[]>(`${this.API}/categories/${categoryName}/attribute-template`))
  }
}
