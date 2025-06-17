import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {UserService} from '../../users/services/user.service';
import {Router} from '@angular/router';
import {ProductService} from '../../products/services/product.service';

@Component({
  standalone: true,
  selector: 'app-components-dashboard',
  imports: [CommonModule, MatCard, MatCardTitle, MatCardHeader, MatCardContent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  router = inject(Router);
  userService = inject(UserService)
  productService = inject(ProductService);

  numberOfUsers: number | null = null
  numberOfProducts: number | null = null

  async ngOnInit() {
    this.numberOfUsers = await this.userService.getNumberOfUsers()
    this.numberOfProducts = await this.productService.getNumberOfProducts()
  }

  redirectTo = (uri: string) => {
    this.router.navigate([uri]);
  };

}
