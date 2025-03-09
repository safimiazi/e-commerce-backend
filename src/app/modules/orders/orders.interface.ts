// orders.interface.ts - orders module
import { ObjectId } from "mongodb";

// Product in an Order
interface IOrderProduct {
  productId: ObjectId;
  quantity: number;
  price: number;
}

// Order Interface
export interface IOrder {
  _id: ObjectId;
  userId: ObjectId; // References the Users collection
  products: IOrderProduct[]; // List of ordered products
  totalAmount: number;
  status: "pending" | "shipped" | "delivered"; // Order status
  paymentMethod: "credit card" | "COD"; // Payment method
  transactionId?: string; // Only required if payment is online
  createdAt: Date;
  updatedAt: Date;
}
