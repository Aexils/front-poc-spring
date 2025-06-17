import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService as Auth0Service } from '@auth0/auth0-angular';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { User } from '../../shared/models/user.model'; // adapte le chemin
import { UserRole } from '../../shared/models/user.model';

export const adminGuard: CanActivateFn = async () => {
  const auth0 = inject(Auth0Service);
  const http = inject(HttpClient);
  const router = inject(Router);

  try {
    const token = await firstValueFrom(auth0.getAccessTokenSilently());

    const user = await firstValueFrom(
      http.get<User>('http://localhost:8080/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    );

    if (user.role === UserRole.ADMIN) {
      return true;
    }

    return router.createUrlTree(['/unauthorized']);
  } catch (error) {
    console.warn('[adminGuard] Accès refusé ou erreur API', error);
    return router.createUrlTree(['/unauthorized']);
  }
};
