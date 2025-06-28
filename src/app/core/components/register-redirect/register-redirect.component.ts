import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {ToastService} from '../../services/toast.service'; // adapte le chemin

@Component({
  selector: 'app-register-redirect',
  standalone: true,
  template: '',
})
export class RegisterRedirectComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  private readonly toastService = inject(ToastService);

  async ngOnInit() {
    try {
      await this.authService.register();
      await this.router.navigate(['/']);

    } catch (error) {
      await this.router.navigate(['/unauthorized']);
      this.toastService.show(`Erreur lors de l\'authentification : ${error}`, 'error');
    }
  }
}
