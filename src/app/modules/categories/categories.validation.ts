// categories.validation.ts - categories module
import { z } from "zod";

// Category Validation Schema
export const categoryValidationSchema = z.object({
  name: z.string().trim(),
  description: z.string().trim(),

});
