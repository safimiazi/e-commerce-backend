// users.validation.ts - users module
import { z } from "zod";
import { ObjectId } from "mongodb";

// Address Schema
export const addressSchema = z.object({
  street: z.string().min(3, "Street must be at least 3 characters long"),
  city: z.string().min(2, "City must be at least 2 characters long"),
  state: z.string().optional(),
  postalCode: z
    .string()
    .min(4, "Postal code must be at least 4 characters")
    .max(10, "Postal code too long"),
  floorNumber: z.string().optional(),
  apartment: z.string().optional(),
});

// User Schema
export const userSchema = z.object({
  _id: z.instanceof(ObjectId).optional(),
  name: z.string().min(3, "Name must be at least 3 characters long"),
  phone: z
    .string()
    .regex(
      /^(?:\+8801[3-9]\d{8}|01[3-9]\d{8})$/,
      "Invalid Bangladeshi phone number format"
    ),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  role: z
    .enum(["customer", "admin"])
    .refine((val) => ["customer", "admin"].includes(val), {
      message: "Role must be either 'customer' or 'admin'",
    }),
  address: z.array(addressSchema).optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});
