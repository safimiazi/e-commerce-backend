import { z } from "zod";

export const createProductValidationSchema = z.object({
  productName: z.string().min(2, "Product name must be at least 2 characters"),
  skuCode: z.string().min(3, "SKU Code is required"),
  productBrand: z.string().optional(),
  productCategory: z.string().optional(),
  productGeneric: z.string().optional(),
  productWeight: z.string().min(1, "Product weight is required"),
  productUnit: z.string().optional(),
  productPurchasePoint: z.string().min(1, "Product purchase point is required"),
  productTags: z.array(z.string()).optional(),
  productBuyingPrice: z.string().min(1, "Buying price is required"),
  productSellingPrice: z.string().min(1, "Selling price is required"),
  productOfferPrice: z.string().optional(),
  productStock: z.string().min(1, "Product stock is required"),
  productFeatureImage: z.string().url("Invalid image URL").optional(),
  productImages: z.array(z.string().url("Invalid image URL")).optional(),
  productDescription: z.string().optional(),
  isFeatured: z.enum(["yes", "not"]).optional(),
  variants: z.array(z.string()).optional(),
});

// ✅ Schema for Updating an Existing Product (EDIT/PATCH)
export const updateProductValidationSchema =
  createProductValidationSchema.partial();
