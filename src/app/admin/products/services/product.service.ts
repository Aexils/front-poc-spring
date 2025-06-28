import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {
  Product,
  ProductAttribute,
  ProductCreatePayload, ProductDTO,
  ProductImage,
  ProductVariant
} from '../../../shared/models/product.model';
import {firstValueFrom, Observable} from 'rxjs';
import {AuthService as Auth0Service} from '@auth0/auth0-angular';

@Injectable({providedIn: 'root'})
export class ProductService {
  private readonly baseUrl = 'http://localhost:8080';
  private auth0 = inject(Auth0Service)
  private http = inject(HttpClient)

  // Products
  async getAll(): Promise<Product[]> {
    return await firstValueFrom(this.http.get<Product[]>(`${this.baseUrl}/products`));
  }

  async getNumberOfProducts(): Promise<number> {
    const token = await firstValueFrom(this.auth0.getAccessTokenSilently());

    return await firstValueFrom(
      this.http.get<any>(`${this.baseUrl}/products/size`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    )
  }

  async getOne(slug: string): Promise<ProductDTO> {
    return await firstValueFrom(this.http.get<ProductDTO>(`${this.baseUrl}/products/slug/${slug}`));
  }

  async create(product: Partial<ProductCreatePayload>): Promise<Observable<Product>> {
    const token = await firstValueFrom(this.auth0.getAccessTokenSilently());


    return this.http.post<Product>(`${this.baseUrl}/admin/products`, product,
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

    return this.http.put<Product>(`${this.baseUrl}/admin/products${id}`, product,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
  }

  async delete(id: string): Promise<Observable<Product>> {
    const token = await firstValueFrom(this.auth0.getAccessTokenSilently());

    return this.http.delete<Product>(`${this.baseUrl}/admin/products${id}`,
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
    return this.http.get<ProductAttribute[]>(`${this.baseUrl}/products/${productId}/attributes`);
  }

  addAttribute(productId: string, attr: Partial<ProductAttribute>): Observable<ProductAttribute> {
    return this.http.post<ProductAttribute>(`${this.baseUrl}/admin/products/${productId}/attributes`, attr);
  }

  deleteAttribute(attrId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/admin/products/attributes/${attrId}`);
  }

  // Images
  getImages(productId: string): Observable<ProductImage[]> {
    return this.http.get<ProductImage[]>(`${this.baseUrl}/${productId}/images`);
  }

  addImage(productId: string, file: File, isMain: boolean): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('isMain', String(isMain));

    return this.http.post(`${this.baseUrl}/admin/products/${productId}/images`, formData);
  }

  async deleteImage(imageId: string | undefined): Promise<any> {
    const token = await firstValueFrom(this.auth0.getAccessTokenSilently());

    return await firstValueFrom(this.http.delete(`${this.baseUrl}/admin/products/images/${imageId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }));
  }

  async setMainImage(productId: string, imageId: string): Promise<void> {
    const token = await firstValueFrom(this.auth0.getAccessTokenSilently());

    return await firstValueFrom(this.http.put<void>(`${this.baseUrl}/admin/products/${productId}/images/${imageId}/main`, {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }));
  }

  // Variants
  getVariants(productId: string): Observable<ProductVariant[]> {
    return this.http.get<ProductVariant[]>(`${this.baseUrl}/products/${productId}/variants`);
  }

  addVariant(productId: string, variant: Partial<ProductVariant>): Observable<ProductVariant> {
    return this.http.post<ProductVariant>(`${this.baseUrl}/admin/products/${productId}/variants`, variant);
  }

  deleteVariant(productId: string, variantId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/admin/products/${productId}/variants/${variantId}`);
  }
}
