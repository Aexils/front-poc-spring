import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product, ProductAttribute, ProductImage, ProductVariant} from '../models/product.model';
import {firstValueFrom, Observable} from 'rxjs';
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

  async getOne(id: string): Promise<Observable<Product>> {
    const token = await firstValueFrom(this.auth0.getAccessTokenSilently());

    return this.http.get<Product>(`${this.baseUrl}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
  }

  async create(product: Partial<Product>): Promise<Observable<Product>> {
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

  async update(id: string, product: Partial<Product>): Promise<Observable<Product>> {
    const token = await firstValueFrom(this.auth0.getAccessTokenSilently());

    return this.http.put<Product>(`${this.baseUrl}/${id}`, product,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
  }

  async delete(id: string): Promise<Product> {
    const token = await firstValueFrom(this.auth0.getAccessTokenSilently());

    return await firstValueFrom(this.http.delete<Product>(`${this.baseUrl}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    ));
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

  addImage(productId: string, image: Partial<ProductImage>): Observable<ProductImage> {
    return this.http.post<ProductImage>(`${this.baseUrl}/${productId}/images`, image);
  }

  deleteImage(imageId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/images/${imageId}`);
  }

  // Variants
  getVariants(productId: string): Observable<ProductVariant[]> {
    return this.http.get<ProductVariant[]>(`${this.baseUrl}/${productId}/variants`);
  }

  addVariant(productId: string, variant: Partial<ProductVariant>): Observable<ProductVariant> {
    return this.http.post<ProductVariant>(`${this.baseUrl}/${productId}/variants`, variant);
  }

  deleteVariant(variantId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/variants/${variantId}`);
  }
}
