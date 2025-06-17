import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // adapte le chemin

@Component({
  selector: 'app-register-redirect',
  standalone: true,
  template: '',
})
export class RegisterRedirectComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);

  async ngOnInit() {
    try {
      await this.authService.register();
      await this.router.navigate(['/']);
    } catch (error) {
      console.error('Erreur lors du register :', error);
      await this.router.navigate(['/unauthorized']);
    }
  }
}
