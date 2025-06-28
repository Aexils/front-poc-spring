import {Component, inject} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {AuthStore} from '../../../core/store/auth.store';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  templateUrl: './layout.component.html',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
  styleUrls: ['./layout.component.scss']
})
export class AdminLayoutComponent {
  readonly user = inject(AuthStore).user
}
