import {Component} from '@angular/core';
import {ProductListComponent} from '../../../products/component/product-list/product-list.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  styleUrl: 'home-page.component.scss',
  templateUrl: 'home-page.component.html',
  imports: [
    ProductListComponent
  ],
})
export class HomePageComponent {
  title = 'Home';
}


