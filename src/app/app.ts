import {Component, inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavbarComponent} from './core/components/navbar/navbar.component';
import {CategoryService} from './core/services/category.service';
import {AuthService} from './core/services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  authService = inject(AuthService)
  categoryService = inject(CategoryService)
  constructor() {
    this.authService.getCurrentUser()
    this.categoryService.getAll()
  }
}
