import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavbarComponent} from './shared/components/header/navbar/navbar';
import {AuthService} from '@auth0/auth0-angular';
import {AuthStore} from './core/store/auth.store';
import {HttpClient} from '@angular/common/http';
import {User} from './core/models/user.model';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  constructor(private auth: AuthService, private store: AuthStore, private http: HttpClient) {
    this.auth.getAccessTokenSilently().subscribe(token => {
      this.http.get<User>('http://localhost:8080/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      }).subscribe(user => this.store.setUser(user));
    });
  }
}
