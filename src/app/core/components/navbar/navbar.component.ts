import {Component, inject, OnInit, ChangeDetectorRef} from '@angular/core';
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
import {ToastService} from '../../services/toast.service';

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
  private readonly toastService = inject(ToastService);
  user = inject(AuthStore).user;
  auth = inject(AuthService);
  categories = inject(CategoryStore).categories
  cartService = inject(CartService)
  cartStore = inject(CartStore)
  cdr = inject(ChangeDetectorRef)

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

  ngOnInit(): void {
    setTimeout(() => {
      const cart = this.cartStore.cart();
      if (cart) {
        let q = 0;
        for (const item of cart.items) {
          q += item.quantity;
        }
        this.cartStore.setCartItemsQuantity(q);
      }
    }, 500); // pour tester si le `getCurrentUser()` finit après ton ngOnInit
  }

  async deleteCartItem(cartItemId: string) {
    await this.cartService.deleteItemCart(cartItemId)
    this.cartStore.removeItem(cartItemId);
    this.toastService.show('Produit supprimé du panier', 'success')
  }
}
