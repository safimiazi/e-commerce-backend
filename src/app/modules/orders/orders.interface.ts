import { ObjectId } from "mongodb";

interface OrderItem {
  productId: ObjectId;
  quantity: number;
  price: number;
}

interface Order {
  _id: ObjectId;
  userId: ObjectId;
  items: OrderItem[];
  totalAmount: number;
  status: "pending" | "shipped" | "delivered" | "cancelled";
  paymentMethod: "COD" | "Credit Card" | "PayPal";
  shippingAddress: string;
  createdAt: Date;
}

export { Order, OrderItem };
