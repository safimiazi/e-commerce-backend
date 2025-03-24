import { z } from "zod";

// Cart Product Item Validation
const CartProductItemSchema = z.object({
  product: z.string(),
  quantity: z.number().min(1, { message: "Quantity must be at least 1" }),
  variant: z.string(), // Validate the Variant data
  price: z.number().min(0, { message: "Price cannot be less than 0" }),
  totalPrice: z
    .number()
    .min(0, { message: "Total price cannot be less than 0" }),
});


// Cart Validation Schema
export const cartSchemaValidation = z.object({
  user: z.string(),
  products: z.array(CartProductItemSchema),
  cartTotalCost: z
    .number()
    .min(0, { message: "Cart total cost cannot be less than 0" }),
  isCheckout: z.boolean().default(false),
});

export const cartUpdateValidation = cartSchemaValidation.partial();
