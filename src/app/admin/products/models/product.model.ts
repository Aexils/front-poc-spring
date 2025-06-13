export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  active: boolean;
  categoryId: string;
  categoryName?: string;
}

export interface ProductAttribute {
  id: string;
  name: string;
  value: string;
  type: string;
  productId: string;
}

export interface ProductImage {
  id: string;
  url: string;
  isMain: boolean;
  productId: string;
}

export interface ProductVariant {
  id: string;
  variantName: string;
  priceOverride: number;
  stock: number;
  active: boolean;
  productId: string;
}
