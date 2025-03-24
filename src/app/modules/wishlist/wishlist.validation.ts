import { z } from 'zod';

export const wishlistValidation = z.object({
  user: z.string().min(1, "User ID is required"),
  products: z.array(z.string().min(1, "Product ID is required")).optional(),
});


export const wishlistUpdateValidation = wishlistValidation.partial();
