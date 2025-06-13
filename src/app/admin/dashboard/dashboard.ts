import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {UserService} from '../users/user.service';
import {Router} from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-components-dashboard',
  imports: [CommonModule, MatCard, MatCardTitle, MatCardHeader, MatCardContent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class DashboardComponent implements OnInit {

  userService = inject(UserService)
  numberOfUsers: number | null = null
  router = inject(Router);

  async ngOnInit() {
    this.numberOfUsers = await this.userService.getNumberOfUsers()
    console.log(this.numberOfUsers)
  }

  redirectTo = (uri: string) => {
    this.router.navigate([uri]);
  };

}
