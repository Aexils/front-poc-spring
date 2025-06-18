import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {RouterModule} from '@angular/router';
import {UserRole} from '../../../shared/models/user.model';
import {AuthStore} from '../../store/auth.store';
import {AuthService} from '@auth0/auth0-angular';
import {CategoryStore} from '../../store/category.store';
import {CartService} from '../../services/cart.service';
import {CartStore} from '../../store/cart.store';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    RouterModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  protected readonly UserRole = UserRole;
  user = inject(AuthStore).user;
  auth = inject(AuthService);
  categories = inject(CategoryStore).categories
  cartService = inject(CartService)
  cartStore = inject(CartStore)

  quantity = 0;
  categorySelected = 'Toutes catégories'

  signup = () => {
    this.auth.loginWithRedirect({
      authorizationParams: {
        redirect_uri: `${window.location.origin}/register`,
        screen_hint: 'signup'
      }
    });
  };

  login = () => {
    this.auth.loginWithRedirect({
      authorizationParams: {
        redirect_uri: `${window.location.origin}/register`
      }
    });
  };

  logout = () => {
    this.auth.logout({
      logoutParams: {
        returnTo: window.location.origin
      }
    });
  };

  selectCategory(category: string) {
    this.categorySelected = category
  }

  async ngOnInit(): Promise<void> {
    this.cartStore.clearCartItemsQuantity()
    const cart = await this.cartService.getOrCreateCartForUser()
    for (const item of cart.items) {
      this.quantity += item.quantity
    }
    this.cartStore.setCartItemsQuantity(this.quantity)
    this.cartStore.setCart(cart)
  }

  async deleteCartItem(cartItemId: string) {
    await this.cartService.deleteItemCart(cartItemId)
    this.cartStore.clearCartItemsQuantity()
    const cart = await this.cartService.getOrCreateCartForUser()
    for (const item of cart.items) {
      this.quantity += item.quantity
    }
    this.cartStore.setCartItemsQuantity(this.quantity)
    this.cartStore.clearCart()
    this.cartStore.setCart(cart)
  }
}
