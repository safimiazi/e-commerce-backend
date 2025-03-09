// categories.validation.ts - categories module
import { z } from "zod";
import { ObjectId } from "mongodb";

// Category Validation Schema
export const categorySchema = z.object({
  _id: z.instanceof(ObjectId),  
  name: z.string()
    .min(3, "Category name must be at least 3 characters long")
    .max(50, "Category name must be less than 50 characters")
    .trim(),
  description: z.string().min(10, "Description must be at least 10 characters long"),
  createdAt: z.date(),
  updatedAt: z.date(),
});
