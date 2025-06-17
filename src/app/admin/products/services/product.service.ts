import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {
  Product,
  ProductAttribute,
  ProductCreatePayload, ProductDTO,
  ProductImage,
  ProductVariant
} from '../../../shared/models/product.model';
import {firstValueFrom, map, Observable} from 'rxjs';
import {AuthService as Auth0Service} from '@auth0/auth0-angular';
import {AuthStore} from '../../../core/store/auth.store';

@Injectable({providedIn: 'root'})
export class ProductService {
  private readonly baseUrl = 'http://localhost:8080/admin/products';

  constructor(private auth0: Auth0Service, private store: AuthStore, private http: HttpClient) {
  }

  // Products
  async getAll(): Promise<Product[]> {
    const token = await firstValueFrom(this.auth0.getAccessTokenSilently());

    return await firstValueFrom(this.http.get<Product[]>(this.baseUrl,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    ));
  }

  async getNumberOfProducts(): Promise<number> {
    const token = await firstValueFrom(this.auth0.getAccessTokenSilently());

    return await firstValueFrom(
      this.http.get<any>(`${this.baseUrl}/size`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    )
  }

  async getOne(slug: string): Promise<ProductDTO> {
    const token = await firstValueFrom(this.auth0.getAccessTokenSilently());

    return await firstValueFrom(this.http.get<ProductDTO>(`${this.baseUrl}/slug/${slug}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }));
  }

  async create(product: Partial<ProductCreatePayload>): Promise<Observable<Product>> {
    const token = await firstValueFrom(this.auth0.getAccessTokenSilently());


    return this.http.post<Product>(this.baseUrl, product,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
  }

  async update(id: string, product: Partial<ProductCreatePayload>): Promise<Observable<Product>> {
    const token = await firstValueFrom(this.auth0.getAccessTokenSilently());

    return this.http.put<Product>(`${this.baseUrl}/${id}`, product,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
  }

  async delete(id: string): Promise<Observable<Product>> {
    const token = await firstValueFrom(this.auth0.getAccessTokenSilently());

    return this.http.delete<Product>(`${this.baseUrl}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
  }

  // Attributes
  getAttributes(productId: string): Observable<ProductAttribute[]> {
    return this.http.get<ProductAttribute[]>(`${this.baseUrl}/${productId}/attributes`);
  }

  addAttribute(productId: string, attr: Partial<ProductAttribute>): Observable<ProductAttribute> {
    return this.http.post<ProductAttribute>(`${this.baseUrl}/${productId}/attributes`, attr);
  }

  deleteAttribute(attrId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/attributes/${attrId}`);
  }

  // Images
  getImages(productId: string): Observable<ProductImage[]> {
    return this.http.get<ProductImage[]>(`${this.baseUrl}/${productId}/images`);
  }

  addImage(productId: string, file: File, isMain: boolean): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('isMain', String(isMain));

    return this.http.post(`${this.baseUrl}/${productId}/images`, formData);
  }

  async deleteImage(imageId: string | undefined): Promise<any> {
    const token = await firstValueFrom(this.auth0.getAccessTokenSilently());

    return await firstValueFrom(this.http.delete(`${this.baseUrl}/images/${imageId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }));
  }

  async setMainImage(productId: string, imageId: string): Promise<void> {
    const token = await firstValueFrom(this.auth0.getAccessTokenSilently());

    return await firstValueFrom(this.http.put<void>(`${this.baseUrl}/${productId}/images/${imageId}/main`, {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }));
  }

  // Variants
  getVariants(productId: string): Observable<ProductVariant[]> {
    return this.http.get<ProductVariant[]>(`${this.baseUrl}/${productId}/variants`);
  }

  addVariant(productId: string, variant: Partial<ProductVariant>): Observable<ProductVariant> {
    return this.http.post<ProductVariant>(`${this.baseUrl}/${productId}/variants`, variant);
  }

  deleteVariant(productId: string, variantId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${productId}/variants/${variantId}`);
  }
}
