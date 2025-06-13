import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';
import { AuthStore } from '../../../../../core/store/auth.store';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';

@Component({
  standalone: true,
  selector: 'app-auth',
  imports: [CommonModule, MatButton, MatMenuItem, MatMenu, MatMenuTrigger, MatIconButton],
  templateUrl: './auth.html',
  styleUrls: ['./auth.scss']
})
export class Auth {
  auth = inject(AuthService);
  user = inject(AuthStore).user;

  signup = () => {
    this.auth.loginWithRedirect({
      authorizationParams: {
        redirect_uri: `${window.location.origin}/register`,
        screen_hint: 'signup'
      }
    });
  };

  login = () => {
    this.auth.loginWithRedirect({
      authorizationParams: {
        redirect_uri: `${window.location.origin}/register`
      }
    });
  };

  logout = () => {
    this.auth.logout({
      logoutParams: {
        returnTo: window.location.origin
      }
    });
  };
}
