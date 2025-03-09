import { z } from "zod";
import { ObjectId } from "mongodb";

// Custom validation for ObjectId
const ObjectIdSchema = z.instanceof(ObjectId);

const OrderItemSchema = z.object({
  productId: ObjectIdSchema,
  quantity: z.number().int().positive("Quantity must be at least 1"),
  price: z.number().positive("Price must be greater than zero"),
});

const OrderSchema = z.object({
  _id: ObjectIdSchema,
  userId: ObjectIdSchema,
  items: z.array(OrderItemSchema).min(1, "Order must have at least one item"),
  totalAmount: z.number().positive("Total amount must be greater than zero"),
  status: z.enum(["pending", "shipped", "delivered", "cancelled"]),
  paymentMethod: z.enum(["COD", "Credit Card", "PayPal"]),
  shippingAddress: z.string().min(5, "Shipping address must be at least 5 characters long"),
  createdAt: z.date()
});

export { OrderSchema };
