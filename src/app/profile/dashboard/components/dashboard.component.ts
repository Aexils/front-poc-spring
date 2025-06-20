import {Component, Input, Output, EventEmitter, inject} from '@angular/core';
import {NgStyle} from '@angular/common';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {AuthStore} from '../../../core/store/auth.store';

@Component({
  selector: 'app-profile-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  imports: [
  ],
  styleUrls: ['./dashboard.component.scss']
})
export class ProfileDashboardComponent {
  readonly user = inject(AuthStore).user

}
