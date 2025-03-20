import { z } from "zod";
import { Types } from "mongoose";

const ObjectIdSchema = z
  .string()
  .refine((id) => Types.ObjectId.isValid(id), "Invalid ObjectId");

export const createProductValidationSchema = z.object({
  productName: z.string().min(1, "Product name is required"), // Ensure product name is a non-empty string
  skuCode: z.string().min(1, "SKU Code is required"), // Ensure SKU code is non-empty
  productBrand: ObjectIdSchema.nullable(), // ObjectId or null
  productCategory: ObjectIdSchema.nullable(), // ObjectId or null
  productGeneric: ObjectIdSchema.nullable().optional(), // ObjectId or null (optional)
  productWeight: z.string().optional(), // Optional weight field as string
  productUnit: ObjectIdSchema.nullable(), // ObjectId or null (required)
  productPurchasePoint: z.string().optional(), // Optional purchase point field as string
  productTags: z.array(z.string()).optional(), // Optional array of tags (string[])
  productBuyingPrice: z.string().min(1, "Buying price is required"), // Buying price (required)
  productSellingPrice: z.string().min(1, "Selling price is required"), // Selling price (required)
  productOfferPrice: z.string().optional(), // Optional offer price
  productStock: z.string().min(1, "Product stock is required"), // Stock quantity (required)
  productFeatureImage: z.string().optional(), // Optional field for feature image URL
  productImages: z.array(z.string()).optional(), // Optional array of image URLs
  productDescription: z.string().optional(), // Optional description field
  isFeatured: z.enum(["yes", "not"]).optional(), // Optional field to indicate if the product is featured
  variantcolor: z.array(ObjectIdSchema).optional(), // Optional array of ObjectIds for color variants
  variant: ObjectIdSchema.optional(), // Optional ObjectId for variant
  createdAt: z.date().optional(), // Optional created date
  updatedAt: z.date().optional(), // Optional updated date
});

// ✅ Schema for Updating an Existing Product (EDIT/PATCH)
export const updateProductValidationSchema =
  createProductValidationSchema.partial();
