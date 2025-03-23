/* eslint-disable @typescript-eslint/no-explicit-any */
import { productModel } from "./product.model";
import { PRODUCT_SEARCHABLE_FIELDS } from "./product.constant";
import QueryBuilder from "../../builder/QueryBuilder";
import status from "http-status";
import AppError from "../../errors/AppError";
import config from "../../config";

export const productService = {
  async create(data: any) {
    try {
      return await productModel.create(data);
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
      const service_query = new QueryBuilder(productModel.find(), query)
        .search(PRODUCT_SEARCHABLE_FIELDS)
        .filter()
        .sort()
        .paginate()
        .fields();

      let result = await service_query.modelQuery
        .populate("productCategory")
        .populate("productUnit")
        .populate("variant")
        .populate("variantcolor")
        .populate("productBrand");

      // Mongoose Document Instance ke normal object e convert kora
      result = result.map((product: any) => {
        const productData = product.toObject(); // Mongoose instance theke pure object banano

        return {
          ...productData,
          productBrand: {
            ...productData.productBrand,
            image: `${config.base_url}/${productData.productBrand.image?.replace(/\\/g, "/")}`,
          },
          productFeatureImage: `${config.base_url}/${productData.productFeatureImage?.replace(/\\/g, "/")}`,
          productImages: productData.productImages.map(
            (img: string) => `${config.base_url}/${img?.replace(/\\/g, "/")}`
          ),
        };
      });

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
  async getAllByCategory(query: any) {
    try {
      console.log("query", query);

      // Extract query params
      const { pageIndex = 1, pageSize = 10, searchTerm, isDelete, id } = query;

      // Build filter object
      const filter: any = { productCategory: id };
      if (typeof isDelete !== "undefined") {
        filter.isDelete = isDelete;
      }
      if (searchTerm) {
        filter.$or = [
          { productName: { $regex: searchTerm, $options: "i" } },
          { skuCode: { $regex: searchTerm, $options: "i" } },
          { productDescription: { $regex: searchTerm, $options: "i" } },
        ];
      }

      // Pagination
      const limit = Number(pageSize) || 10;
      const skip = (Number(pageIndex) - 1) * limit;

      // Query database
      let result = await productModel
        .find(filter)
        .populate("productCategory")
        .populate("productUnit")
        .populate("variant")
        .populate("variantcolor")
        .populate("productBrand")
        .skip(skip)
        .limit(limit);

      result = result.map((product: any) => {
        const productData = product.toObject(); // Mongoose instance theke pure object banano

        return {
          ...productData,
          productBrand: {
            ...productData.productBrand,
            image: `${config.base_url}/${productData.productBrand.image?.replace(/\\/g, "/")}`,
          },
          productFeatureImage: product.productFeatureImage
            ? `${config.base_url}/${product.productFeatureImage.replace(/\\/g, "/")}`
            : null,
          productImages: productData.productImages.map(
            (img: string) => `${config.base_url}/${img?.replace(/\\/g, "/")}`
          ),
        };
      });

      // Count total documents
      const total = await productModel.countDocuments(filter);
      const totalPage = Math.ceil(total / limit);

      return {
        result,
        meta: { pageIndex, pageSize, total, totalPage },
      };
    } catch (error: any) {
      throw new Error(`Get by category operation failed: ${error.message}`);
    }
  },
  async getById(id: string) {
    try {
      return await productModel.findById(id);
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
      const isDeleted = await productModel.findOne({ _id: data.id });
      if (isDeleted?.isDelete) {
        throw new AppError(status.NOT_FOUND, "product is already deleted");
      }

      const result = await productModel.updateOne({ _id: data.id }, data, {
        new: true,
      });
      if (!result) {
        throw new Error("product not found.");
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
      // Step 1: Check if the product exists in the database
      const isExist = await productModel.findOne({ _id: id });

      if (!isExist) {
        throw new AppError(status.NOT_FOUND, "product not found");
      }

      // Step 4: Delete the home product from the database
      await productModel.updateOne({ _id: id }, { isDelete: true });
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

      // Step 1: Check if the product exist in the database
      const existingproduct = await productModel.find({ _id: { $in: ids } });

      if (existingproduct.length === 0) {
        throw new AppError(
          status.NOT_FOUND,
          "No product found with the given IDs"
        );
      }

      // Step 2: Perform soft delete by updating isDelete field to true
      await productModel.updateMany({ _id: { $in: ids } }, { isDelete: true });

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
