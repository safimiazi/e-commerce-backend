import { ObjectId } from "mongoose";

// Product Variant interface
interface Variant {
  color: {
    name: string;
    code: string;
  };
  size: string;
}

// Cart Product Item interface
interface CartProductItem {
  product: ObjectId; // Referencing Product model ObjectId
  quantity: number;
  variant: Variant;
  price: number;
  totalPrice: number;
}

// Cart interface
export interface CartInterface {
  user: ObjectId; // Referencing User model ObjectId
  products: CartProductItem[];
  cartTotalCost: number;
  isCheckout: boolean;
  createdAt: Date;
  updatedAt: Date;
}
