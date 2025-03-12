/* eslint-disable @typescript-eslint/no-explicit-any */
import status from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import { product_searchable_fields } from "./product.constant";
import { IProduct } from "./product.interface";
import ProductModel from "./product.model";
import AppError from "../../errors/AppError";
import { formatResultImage } from "../../utils/formatImage";

// product.service.ts - product module
const createProductIntoDB = async (data: Partial<IProduct>) => {
  try {
    const result = await ProductModel.create(data);
    return result;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const getProductByIdFromDB = async (id: any) => {
  try {
    const result = await ProductModel.findById(id);
    if (!result) {
      throw new AppError(status.NOT_FOUND, "Product not found.");
    }

    if (result.isDelete) {
      throw new AppError(status.FORBIDDEN, "This product is deleted.");
    }
    return result;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const getAllProductsFromDB = async (query: any) => {
  try {
    const service_query = new QueryBuilder(ProductModel.find(), query)
      .search(product_searchable_fields)
      .filter()
      .sort()
      .paginate()
      .fields();

    let result: any = await service_query.modelQuery;
    result = formatResultImage(result, "images");
    const meta = await service_query.countTotal();
    return {
      result,
      meta,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred.");
    }
  }
};

const updateProductInDB = async (data: any) => {
  try {
    const isDeleted = await ProductModel.findOne({ _id: data.id });
    if (isDeleted?.isDelete) {
      throw new AppError(status.NOT_FOUND, "Product is already deleted");
    }

    const result = await ProductModel.updateOne({ _id: data.id }, data, {
      new: true,
    });
    if (!result) {
      throw new Error("Product not found.");
    }
    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Database Update Error: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred.");
    }
  }
};

const deleteProductFromDB = async (id: any) => {
  try {
    // Step 1: Check if the banner exists in the database
    const isExist = await ProductModel.findOne({ _id: id });

    if (!isExist) {
      throw new AppError(status.NOT_FOUND, "Product not found");
    }

    // Step 4: Delete the home banner from the database
    await ProductModel.updateOne({ _id: id }, { isDelete: true });
    return;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred.");
    }
  }
};
export const productServcies = {
  createProductIntoDB,
  getProductByIdFromDB,
  getAllProductsFromDB,
  updateProductInDB,
  deleteProductFromDB,
};
