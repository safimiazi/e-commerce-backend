/* eslint-disable @typescript-eslint/no-explicit-any */
// categories.service.ts - categories module

import status from "http-status";
import AppError from "../../errors/AppError";
import { checkIfDocumentExists } from "../../utils/CheckIfDocumentExist";
import { ICategory } from "./categories.interface";
import categoryModel from "./categories.model";
import QueryBuilder from "../../builder/QueryBuilder";
import { category_searchable_fields } from "./categories.constant";

const postCategoryIntoDB =async(data: ICategory) => {
  try {
    // Check if category already exists
    const existingCategory = await checkIfDocumentExists(categoryModel, "name", data.name)
    if (existingCategory) {
      throw new AppError( status.NOT_FOUND ,"Category already exists");
    }

    // Create a new category in the database
    const category = await categoryModel.create(data);

    return category;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const getCategoriesIntoDB = async (query: Record<string, unknown>) => {
  try {
    const service_query = new QueryBuilder(categoryModel.find(), query)
      .search(category_searchable_fields)
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
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred.");
    }
  }
};

export const categoryServices = {
  postCategoryIntoDB,getCategoriesIntoDB
};
