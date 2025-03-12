import { z } from "zod";

export const createProductValidationSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.string(),
  category: z.string(),
  stock: z.string(),
});

// ✅ Schema for Updating an Existing Product (EDIT/PATCH)
export const updateProductValidationSchema =
  createProductValidationSchema.partial();
