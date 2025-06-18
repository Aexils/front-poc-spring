import {Product, ProductVariant} from './product.model';

export interface Cart {
  id: string;
  items: CartItem[]
}

export interface CartItem {
  id: string;
  quantity: number;
  cartId: string;
  variantId: string;
  variantName: string;
  price: number;
  product: Product;
}
