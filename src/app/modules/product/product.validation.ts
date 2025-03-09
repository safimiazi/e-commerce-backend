// product.validation.ts - product module
import { z } from "zod";
import { ObjectId } from "mongodb";

// Product Validation Schema
export const productSchema = z.object({
  _id: z.instanceof(ObjectId),  
  name: z.string().min(3, "Product name must be at least 3 characters long"),
  description: z.string().min(10, "Description must be at least 10 characters long"),
  price: z.number().min(0, "Price cannot be negative"),  
  category: z.instanceof(ObjectId),  // Category should be a valid ObjectId
  brand: z.string().min(2, "Brand name must be at least 2 characters long"),
  stock: z.number().min(0, "Stock cannot be negative"),  
  images: z.array(z.string().url("Invalid image URL format")),  // Array of valid image URLs
  createdAt: z.date(),
  updatedAt: z.date(),
});
