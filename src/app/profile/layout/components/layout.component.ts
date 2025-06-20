import {Component, inject} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {AuthStore} from '../../../core/store/auth.store';

@Component({
  selector: 'app-profile-layout',
  standalone: true,
  templateUrl: './layout.component.html',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
  styleUrls: ['./layout.component.scss']
})
export class ProfileLayoutComponent {
  readonly user = inject(AuthStore).user
}
