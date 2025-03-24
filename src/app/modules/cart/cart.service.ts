import { cartModel } from "./cart.model";
  import { CART_SEARCHABLE_FIELDS } from "./cart.constant";
import QueryBuilder from "../../builder/QueryBuilder";
import status from "http-status";
import AppError from "../../errors/AppError";


export const cartService = {
  async create(data: any) {
  try {
    return await cartModel.create(data);
     } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Get by ID operation failed: ${error.message}`);
      } else {
        throw new Error("An unknown error occurred while fetching by ID.");
      }
    }
  },
  async getAll(query: any) {
  try {


  const service_query = new QueryBuilder(cartModel.find(), query)
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
        throw new Error(`Get by ID operation failed: ${error.message}`);
      } else {
        throw new Error("An unknown error occurred while fetching by ID.");
      }
    }
  },
  async getById(id: string) {
    try {
    return await cartModel.findById(id);
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
  }
};