
export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  billingAddresses: BillingAddress[];
  shippingAddresses: ShippingAddress[];
}

export interface BillingAddress {
  id: string;
  street: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
}

export interface ShippingAddress {
  id: string;
  street: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
}

