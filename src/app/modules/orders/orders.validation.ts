// orders.validation.ts - orders module
import { z } from "zod";
import { ObjectId } from "mongodb";

// Order Product Validation Schema
const orderProductSchema = z.object({
  productId: z.instanceof(ObjectId),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  price: z.number().min(0, "Price cannot be negative"),
});

// Order Validation Schema
export const orderSchema = z.object({
  _id: z.instanceof(ObjectId),
  userId: z.instanceof(ObjectId), // Must be a valid user ID
  products: z.array(orderProductSchema).min(1, "Order must contain at least one product"),
  totalAmount: z.number().min(0, "Total amount cannot be negative"),
  status: z.enum(["pending", "shipped", "delivered"]),
  paymentMethod: z.enum(["credit card", "COD"]),
  transactionId: z.string().optional(), // Only required if online payment
  createdAt: z.date(),
  updatedAt: z.date(),
});
