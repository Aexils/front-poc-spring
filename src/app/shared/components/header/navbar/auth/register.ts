import {Component, inject, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  template: '',
})
export class Register implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);

  async ngOnInit() {
    try {
      await this.authService.register();
      await this.router.navigate(['/']);
    } catch (e) {
      console.error('Erreur lors du register', e);
    }
  }
}

