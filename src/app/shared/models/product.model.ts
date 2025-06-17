export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  active: boolean;
  categoryId: string;
  categoryName?: string;
  attributes?: ProductAttribute[]
  images?: ProductImage[]
  variants?: ProductVariant[]
}

export interface ProductAttribute {
  id: string;
  name: string;
  value: string;
  type: string;
  productId: string;
}

export interface ProductImage {
  id?: string;
  url: string;
  isMain?: boolean;
  productId?: string;
  isLocal?: boolean;
}

export interface ProductVariant {
  id: string;
  variantName: string;
  priceOverride: number;
  stock: number;
  active: boolean;
  productId: string;
}

export interface ProductCreatePayload {
  name: string;
  slug: string;
  description: string;
  price: number;
  active: boolean;
  categoryId: string;
  imageUrls?: string[];
  attributes: { name: string; value: string; type: string }[];
  variants: { variantName: string; priceOverride: string; stock: string; active: boolean; }[];
}

export interface ProductDTO {
  id: string,
  name: string,
  slug: string,
  description: string,
  price: number,
  active: boolean,
  categoryId: string,
  categoryName: string,
  attributes: { name: string; value: string; type: string }[];
  images: { url: string; isMain: boolean; }[];
  variants: { variantName: string; priceOverride: string; stock: string; active: boolean; }[];
}
