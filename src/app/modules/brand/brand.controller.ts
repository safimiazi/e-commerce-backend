// brand.controller.ts - brand module
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { brandServcies } from "./brand.service";

// brand.controller.ts - brand module
const postbrand = catchAsync(async (req, res) => {
  // Extract image file paths from uploaded files
  const images = Array.isArray(req.files)
    ? req.files.map((file: any) => file.path)
    : [];

    console.log(images);

  // Create the brand in the database
  const result = await brandServcies.createbrandIntoDB({
    ...req.body,
    images,
  });

  // Send success response
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "brand created successfully",
    data: result,
  });
});

const getbrands = catchAsync(async (req, res) => {
  const result = await brandServcies.getAllbrandsFromDB(req.query);
  console.log("result", result);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "All brands fetched successfully",
    data: result,
  });
});

const getbrandById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = brandServcies.getbrandByIdFromDB(id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "brand fetched successfully",
    data: result,
  });
});

const updatebrand = catchAsync(async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  console.log({ id, ...req.body });
  const result = brandServcies.updatebrandInDB({ id, ...req.body });
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "brand updated successfully",
    data: result,
  });
});

const deletebrand = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = brandServcies.deletebrandFromDB(id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "brand deleted successfully",
    data: result,
  });
});

export const brandController = {
  postbrand,
  getbrands,
  getbrandById,
  updatebrand,
  deletebrand,
};
