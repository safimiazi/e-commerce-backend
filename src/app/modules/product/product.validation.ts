import { z } from "zod";
import { ObjectId } from "mongodb";

// Custom validation for ObjectId
const ObjectIdSchema = z.instanceof(ObjectId);

 export const ReviewSchema = z.object({
  userId: ObjectIdSchema,
  comment: z.string().min(3, "Comment must be at least 3 characters long"),
  rating: z.number().min(1).max(5, "Rating must be between 1 and 5"),
  createdAt: z.date()
});

 export const ProductSchema = z.object({
  _id: ObjectIdSchema,
  name: z.string().min(3, "Name must be at least 3 characters long"),
  description: z.string().min(10, "Description must be at least 10 characters long"),
  price: z.number().positive("Price must be greater than zero"),
  categoryId: ObjectIdSchema,
  images: z.array(z.string().url("Invalid image URL")).min(1, "At least one image is required"),
  stock: z.number().int().nonnegative("Stock must be a non-negative integer"),
  rating: z.number().min(0).max(5, "Rating must be between 0 and 5"),
  reviews: z.array(ReviewSchema),
  createdAt: z.date()
});

