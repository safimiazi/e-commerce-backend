// categories.validation.ts - categories module
import { z } from "zod";
import { ObjectId } from "mongodb";

// Category Validation Schema
export const categorySchema = z.object({
  _id: z.instanceof(ObjectId),  
  name: z.string().trim(),
  description: z.string().trim(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
