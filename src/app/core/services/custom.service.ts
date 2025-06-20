import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {Customer} from '../../shared/models/customer.model';
import {firstValueFrom, Observable} from 'rxjs';
import {AuthService as Auth0service} from '@auth0/auth0-angular';

@Injectable({providedIn: 'root'})
export class CustomerService {
  private http = inject(HttpClient);
  private auth0 = inject(Auth0service)
  private baseUrl = 'http://localhost:8080/customer'; // adapte si besoin

  async updateCustomer(customer: Customer): Promise<void> {
    let token: string | null = null;

    try {
      token = await firstValueFrom(this.auth0.getAccessTokenSilently());
    } catch {
      return;
    }

    if (!token) return;
    return await firstValueFrom(this.http.put<void>(this.baseUrl,
      customer,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }));
  }
}
