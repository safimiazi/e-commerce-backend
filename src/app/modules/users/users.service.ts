/* eslint-disable @typescript-eslint/no-explicit-any */
import { usersModel } from "./users.model";
import { USERS_SEARCHABLE_FIELDS } from "./users.constant";
import QueryBuilder from "../../builder/QueryBuilder";
import status from "http-status";
import AppError from "../../errors/AppError";
import bcrypt from "bcryptjs";
import config from "../../config";

export const usersService = {
  async create(data: any) {
    try {
      let user = await usersModel.findOne({ phone: data.phone });

      if (user) throw new AppError(status.BAD_REQUEST, "User already exists");

      user = new usersModel({ phone: data.phone });
      await user.save();
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(` ${error.message}`);
      } else {
        throw new Error("An unknown error occurred while fetching by ID.");
      }
    }
  },
  async adminRegistration(data: any) {
    try {
      const { email, phone, password } = data;

      // Check if the admin already exists
      const existingAdmin = await usersModel.findOne({
        $or: [{ email }, { phone }],
      });
      if (existingAdmin) {
        throw new Error(`Admin already exists, please login.`);
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, config.SALT);

      // Create new admin
      await usersModel.create({
        email,
        phone,
        password: hashedPassword,
      });
      return;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(` ${error.message}`);
      } else {
        throw new Error("An unknown error occurred while fetching by ID.");
      }
    }
  },
  async login(data: any) {
    try {
      const user = await usersModel.findOne({ phone: data.phone });

      if (!user)
        throw new AppError(
          status.BAD_REQUEST,
          "User not found please register"
        );

      return user;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`${error.message}`);
      } else {
        throw new Error("An unknown error occurred while fetching by ID.");
      }
    }
  },
  async adminLogin(data: any) {
    const { phone, email, password } = data;

    try {
      const user = await usersModel.findOne({
        $or: [{ phone }, { email }],
        role: "admin",
      });

      if (!user || !user.password) throw new Error("Invalid credentials");

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) throw new Error("Invalid credentials");
      return user;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`${error.message}`);
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
        throw new Error(`${error.message}`);
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
        throw new Error(`${error.message}`);
      } else {
        throw new Error("An unknown error occurred while fetching by ID.");
      }
    }
  },
  async update(data: any) {
    try {
      // const isDeleted = await usersModel.findOne({ _id: data.id });
      // if (isDeleted?.isDelete) {
      //   throw new AppError(status.NOT_FOUND, "users is already deleted");
      // }

      const result = await usersModel.updateOne({ _id: data.id }, data, {
        new: true,
      });
      if (!result) {
        throw new Error("users not found.");
      }
      return result;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`${error.message}`);
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
        throw new Error(`${error.message}`);
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
        throw new Error(`${error.message}`);
      } else {
        throw new Error("An unknown error occurred while fetching by ID.");
      }
    }
  },
};
