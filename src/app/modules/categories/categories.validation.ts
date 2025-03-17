// categories.validation.ts - categories module
import { Types } from "mongoose";
import { z } from "zod";

// Category Validation Schema
export const categoryValidationSchema = z.object({
  name: z.string().min(1, "Category name is required"),
  parentCategory: z
    .string()
    .refine((val) => Types.ObjectId.isValid(val) || val === null, {
      message: "Invalid parent category ID",
    })
    .optional(),
  status: z.enum(["active", "inactive"]),
  description: z.string().optional(),
  isDelete: z.boolean().default(false),

});

export const editCategoryValidationSchema = categoryValidationSchema.partial()
