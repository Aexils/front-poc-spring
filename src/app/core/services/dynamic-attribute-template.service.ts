import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DynamicAttributeTemplate} from '../../shared/models/dynamic-attribute-template.model';
import {firstValueFrom, Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({providedIn: 'root'})
export class DynamicAttributeTemplateService {
  private http = inject(HttpClient)

  async getDynamicAttributeByCategoryName(categoryName: string): Promise<DynamicAttributeTemplate[]> {
    return await firstValueFrom(this.http.get<DynamicAttributeTemplate[]>(`${environment.apiUrl}/categories/${categoryName}/attribute-template`))
  }
}
