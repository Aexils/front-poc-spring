import {AuthStore} from '../../core/store/auth.store';
import {inject, Injectable} from '@angular/core';
import {AuthService as Auth0Service} from '@auth0/auth0-angular';
import {firstValueFrom} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {User} from '../../core/models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  auth0 = inject(Auth0Service);
  http = inject(HttpClient);

  async getNumberOfUsers(): Promise<number> {
    const token = await firstValueFrom(this.auth0.getAccessTokenSilently());

    return await firstValueFrom(
      this.http.get<any>('http://localhost:8080/users/size', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    )
  }

  async getAllUsers(): Promise<User[]> {
    const token = await firstValueFrom(this.auth0.getAccessTokenSilently());

    return await firstValueFrom(
      this.http.get<User[]>('http://localhost:8080/users', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    );
  }

  async updateUser(user: User): Promise<string> {
    const token = await firstValueFrom(this.auth0.getAccessTokenSilently());

    return await firstValueFrom(
      this.http.put<string>(
        'http://localhost:8080/user',
        user,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      )
    );
  }

}
