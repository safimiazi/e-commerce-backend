/* eslint-disable @typescript-eslint/no-explicit-any */
import { cartModel } from "./cart.model";
import { CART_SEARCHABLE_FIELDS } from "./cart.constant";
import QueryBuilder from "../../builder/QueryBuilder";
import status from "http-status";
import AppError from "../../errors/AppError";
import { productModel } from "../product/product.model";

export const cartService = {
  async create(user: any, data: any) {
    try {
      // 1️⃣ Product Fetch kore stock check korbo
      const product = (await productModel.findById(data.product)) as {
        productStock: number;
      } | null;
      if (!product) {
        throw new Error("Product not found");
      }

      // 2️⃣ Cart check korbo
      const isCartExist = await cartModel.findOne({
        user: user,
        isCheckout: false,
        isDelete: false,
      });

      if (isCartExist) {
        const isProductExist = isCartExist.products.find(
          (product: any) => product.product.toString() === data.product
        );

        if (isProductExist) {
          // 3️⃣ Cart e already product thakle: (existing quantity + new quantity) er stock check korbo
          const newQuantity = isProductExist.quantity + 1; // Frontend theke always 1 asteche

          if (product.productStock < newQuantity) {
            throw new Error("Not enough stock available");
          }

          isProductExist.quantity = newQuantity;
          isProductExist.totalPrice =
            isProductExist.quantity * isProductExist.price;
          isCartExist.cartTotalCost += isProductExist.price;
          await isCartExist.save();
          return isCartExist;
        }

        // 4️⃣ Jodi cart e na thake, tahole stock check kore add korbo
        if (product.productStock < 1) {
          throw new Error("Not enough stock available");
        }

        isCartExist.products.push({
          ...data,
          quantity: 1,
          totalPrice: data.price,
        });
        isCartExist.cartTotalCost += data.price;
        await isCartExist.save();
        return isCartExist;
      }

      // 5️⃣ Jodi cart notun hoy, tahole create korbo with stock check
      if (product.productStock < 1) {
        throw new Error("Not enough stock available");
      }

      const newCart = new cartModel({
        user: user,
        products: [{ ...data, quantity: 1, totalPrice: data.price }],
        cartTotalCost: data.price,
      });

      await newCart.save();
      return newCart;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`${error.message}`);
      } else {
        throw new Error("An unknown error occurred while processing the cart.");
      }
    }
  },
  async removeFromCart(user: any, data: any) {
    try {
      // 1️⃣ Cart check korbo
      const isCartExist = await cartModel.findOne({
        user: user,
        isCheckout: false,
        isDelete: false,
      });
      if (!isCartExist) {
        throw new AppError(status.NOT_FOUND, "Cart not found");
      }
      // 2️��� Product remove korbo
      const productIndex = isCartExist.products.findIndex(
        (product: any) => product.product.toString() === data.product
      );
      if (productIndex === -1) {
        throw new AppError(status.NOT_FOUND, "Product not found in the cart");
      }
      const product = isCartExist.products[productIndex];
      if (product.quantity > 1) {
        // 3️⃣ Jodi quantity 1 er beshi hoy, tahole quantity komabo
        product.quantity -= 1;
        product.totalPrice = product.quantity * product.price;
        isCartExist.cartTotalCost -= product.price;
        await isCartExist.save();
        return isCartExist;
      }
      // 4️⃣ Jodi quantity 1 hoy, tahole product remove korbo

      isCartExist.cartTotalCost -= product.totalPrice;
      isCartExist.products.splice(productIndex, 1);
      await isCartExist.save();
      return isCartExist;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`${error.message}`);
      } else {
        throw new Error("An unknown error occurred while processing the cart.");
      }
    }
  },

  async getAll(query: any) {
    try {
      const service_query = new QueryBuilder(
        cartModel.find({
          user: "60b8d6d5f4b88a001f07b82e",
          isCheckout: false,
          isDelete: query?.isDelete,
        }),
        query
      )
        .search(CART_SEARCHABLE_FIELDS)
        .filter()
        .sort()
        .paginate()
        .fields();

      const result = await service_query.modelQuery;
      const meta = await service_query.countTotal();
      return {
        result,
        meta,
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(` ${error.message}`);
      } else {
        throw new Error("An unknown error occurred while fetching by ID.");
      }
    }
  },
  async getById(id: string) {
    try {
      const result = await cartModel.findOne({
        user: id,
        isCheckout: false,
        isDelete: false,
      });
      console.log(result);
      return result;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Get by ID operation failed: ${error.message}`);
      } else {
        throw new Error("An unknown error occurred while fetching by ID.");
      }
    }
  },
  async update(data: any) {
    try {
      const isDeleted = await cartModel.findOne({ _id: data.id });
      if (isDeleted?.isDelete) {
        throw new AppError(status.NOT_FOUND, "cart is already deleted");
      }

      const result = await cartModel.updateOne({ _id: data.id }, data, {
        new: true,
      });
      if (!result) {
        throw new Error("cart not found.");
      }
      return result;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Get by ID operation failed: ${error.message}`);
      } else {
        throw new Error("An unknown error occurred while fetching by ID.");
      }
    }
  },
  async delete(id: string) {
    try {
      // Step 1: Check if the cart exists in the database
      const isExist = await cartModel.findOne({ _id: id });

      if (!isExist) {
        throw new AppError(status.NOT_FOUND, "cart not found");
      }

      // Step 4: Delete the home cart from the database
      await cartModel.updateOne({ _id: id }, { isDelete: true });
      return;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Get by ID operation failed: ${error.message}`);
      } else {
        throw new Error("An unknown error occurred while fetching by ID.");
      }
    }
  },
  async bulkDelete(ids: string[]) {
    try {
      if (!ids || !Array.isArray(ids) || ids.length === 0) {
        throw new Error("Invalid IDs provided");
      }

      // Step 1: Check if the cart exist in the database
      const existingcart = await cartModel.find({ _id: { $in: ids } });

      if (existingcart.length === 0) {
        throw new AppError(
          status.NOT_FOUND,
          "No cart found with the given IDs"
        );
      }

      // Step 2: Perform soft delete by updating isDelete field to true
      await cartModel.updateMany({ _id: { $in: ids } }, { isDelete: true });

      return;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Get by ID operation failed: ${error.message}`);
      } else {
        throw new Error("An unknown error occurred while fetching by ID.");
      }
    }
  },
};
