import { Product } from '../product/product';

export interface CartItem {
  items: Items[]
  cartTotal?: number,
  totalQuantityOrdered?: number,
  orderby: string
}

export interface Items {
  product?: Product;
  quantity: number;
  color: string;
  _id: string;
  id: string;
  price?: number,
  discountPrice?: number,
  name?: string;
  description: string;
  image?: string
  maxQuantity: number
}

export interface Cart {
  cartItems: CartItem[];
}
