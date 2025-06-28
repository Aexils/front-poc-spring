import {
  APP_INITIALIZER,
  ApplicationConfig, inject, provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideAuth0} from '@auth0/auth0-angular';
import {provideHttpClient} from '@angular/common/http';
import {AuthService} from './core/services/auth.service';
import {CategoryService} from './core/services/category.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAppInitializer( async () => {
      const authService = inject(AuthService)
      const categoryService = inject(CategoryService)
      await categoryService.getAll()
      return authService.getCurrentUser()
    }),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideAuth0({
      domain: 'dev-w1ovinvzfjhlvukf.us.auth0.com',
      clientId: '6ekdImqAukwZVESwcfTaZ11g9ha5nsXw',
      authorizationParams: {
        redirect_uri: `${window.location.origin}/register`,
        audience: 'https://dev-w1ovinvzfjhlvukf.us.auth0.com/api/v2/',
        scope: 'openid profile email'
      }
    }),
  ]
};
