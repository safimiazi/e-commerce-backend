import { z } from "zod";
import { ObjectId } from "mongodb";

// Custom validation for ObjectId
const ObjectIdSchema = z.instanceof(ObjectId);

export const createProductValidationSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long"),
  price: z.number().positive("Price must be greater than zero"),
  categoryId: ObjectIdSchema,
  images: z.array(z.string().min(1, "At least one image is required")),
  stock: z.number().int().nonnegative("Stock must be a non-negative integer"),
  rating: z.number().min(0).max(5, "Rating must be between 0 and 5"),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// ✅ Schema for Updating an Existing Product (EDIT/PATCH)
export const updateProductSchema = createProductValidationSchema.partial();
