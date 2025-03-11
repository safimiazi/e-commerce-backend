import status from "http-status";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { categoryServices } from "./categories.service";


const postCategory = catchAsync(async (req, res) => {
    const data = req.body;
  
    const result = await categoryServices.postCategoryIntoDB(data);
  
    // Send a success response
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Category is created succesfully.",
      data: result,
    });
  });


const getCategory = catchAsync(async (req, res) => {
  
    const result = await categoryServices.getCategoriesIntoDB(req.query);
  
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Category is get succesfully.",
      data: result,
    });
  });
  export const categoryController = {
    postCategory, getCategory
  }