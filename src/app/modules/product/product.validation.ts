import { z } from 'zod';

export const productValidation = z.object({
  productName: z.string().min(1, "Product name is required"),
  skuCode: z.string().min(1, "SKU code is required"),
  productCategory: z.string().min(1, "Category is required"),
  productBrand: z.string().min(1, "Brand is required"),
  productWeight: z.string().optional(),
  productUnit: z.string().min(1, "Unit is required"),
  productPurchasePoint: z.string().optional(),
  productBuyingPrice: z.number().min(0, "Buying price must be a positive number"),
  productSellingPrice: z.number().min(0, "Selling price must be a positive number"),
  productOfferPrice: z.number().optional(),
  productStock: z.number().min(0, "Stock must be a positive number"),
  isFeatured: z.boolean().default(false),
  productDescription: z.string().optional(),
  productFeatureImage: z.string().optional(),
  productImages: z.array(z.string()).optional(),
  variant: z.string().nullable().optional(),
  variantcolor: z.array(z.string()).optional(),
});


export const productUpdateValidation = productValidation.partial();
