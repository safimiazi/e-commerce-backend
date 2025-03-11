/* eslint-disable @typescript-eslint/no-unused-vars */
import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { productServcies } from "./product.service";

// product.controller.ts - product module
const postProduct = catchAsync(async (req, res) => {



    const result = productServcies.createProductIntoDB();
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Category created successfully",
      data: result,
    });
  });

  const getProducts = catchAsync(async (req, res) => {
    const result = productServcies.getAllProductsFromDB();
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "All products fetched successfully",
      data: result,
    });
  })


  const getProductById = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = productServcies.getProductByIdFromDB();
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
    const result = productServcies.updateProductInDB();
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Product updated successfully",
      data: result,
    });
  });


  const deleteProduct = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = productServcies.deleteProductFromDB();
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Product deleted successfully",
      data: result,
    });
  })

  export const productController = {
    postProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
  }