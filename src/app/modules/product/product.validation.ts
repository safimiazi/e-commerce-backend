import { z } from "zod";
import { ObjectId } from "mongodb";

// Custom validation for ObjectId
const ObjectIdSchema = z.instanceof(ObjectId);

export const createProductValidationSchema = z.object({
  name: z.string(),
  description: z
    .string(),
    price: z.string(),
  categoryId: ObjectIdSchema,
  images: z.array(z.string().min(1, "At least one image is required")),
  stock: z.string(),
  rating: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// ✅ Schema for Updating an Existing Product (EDIT/PATCH)
export const updateProductValidationSchema = createProductValidationSchema.partial();
