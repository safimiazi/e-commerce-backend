import { usersModel } from "./users.model";
  import { USERS_SEARCHABLE_FIELDS } from "./users.constant";
import QueryBuilder from "../../builder/QueryBuilder";
import status from "http-status";
import AppError from "../../errors/AppError";


export const usersService = {
  async create(data: any) {
  try {
    return await usersModel.create(data);
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


  const service_query = new QueryBuilder(usersModel.find(), query)
        .search(USERS_SEARCHABLE_FIELDS)
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
    return await usersModel.findById(id);
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



  const isDeleted = await usersModel.findOne({ _id: data.id });
    if (isDeleted?.isDelete) {
      throw new AppError(status.NOT_FOUND, "users is already deleted");
    }

    const result = await usersModel.updateOne({ _id: data.id }, data, {
      new: true,
    });
    if (!result) {
      throw new Error("users not found.");
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


 // Step 1: Check if the users exists in the database
    const isExist = await usersModel.findOne({ _id: id });

    if (!isExist) {
      throw new AppError(status.NOT_FOUND, "users not found");
    }

    // Step 4: Delete the home users from the database
    await usersModel.updateOne({ _id: id }, { isDelete: true });
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

      // Step 1: Check if the users exist in the database
      const existingusers = await usersModel.find({ _id: { $in: ids } });

      if (existingusers.length === 0) {
        throw new AppError(
          status.NOT_FOUND,
          "No users found with the given IDs"
        );
      }

      // Step 2: Perform soft delete by updating isDelete field to true
      await usersModel.updateMany({ _id: { $in: ids } }, { isDelete: true });

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