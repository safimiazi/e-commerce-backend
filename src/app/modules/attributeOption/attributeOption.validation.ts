// attributeOption.validation.ts - attributeOption module
import { z } from "zod";

export const AttributeOptionValidationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  type: z.enum(["color", "other"]),
});

export const updateAttributeOptionValidationSchema = AttributeOptionValidationSchema.partial()

