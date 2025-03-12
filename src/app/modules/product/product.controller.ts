/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { productServcies } from "./product.service";

// product.controller.ts - product module
const postProduct = catchAsync(async (req, res) => {
  // Extract image file paths from uploaded files
  const images = Array.isArray(req.files)
    ? req.files.map((file: any) => file.path)
    : [];

    console.log(images);

  // Create the product in the database
  const result = await productServcies.createProductIntoDB({
    ...req.body,
    images,
  });

  // Send success response
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Product created successfully",
    data: result,
  });
});

const getProducts = catchAsync(async (req, res) => {
  const result = await productServcies.getAllProductsFromDB(req.query);
  console.log("result", result);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "All products fetched successfully",
    data: result,
  });
});

const getProductById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = productServcies.getProductByIdFromDB(id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Product fetched successfully",
    data: result,
  });
});

const updateProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  console.log({ id, ...req.body });
  const result = productServcies.updateProductInDB({ id, ...req.body });
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Product updated successfully",
    data: result,
  });
});

const deleteProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = productServcies.deleteProductFromDB(id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Product deleted successfully",
    data: result,
  });
});

export const productController = {
  postProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
