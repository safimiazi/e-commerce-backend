import { Request, Response } from "express";
import { cartService } from "./cart.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import status from "http-status";
import { cartValidation } from "./cart.validation";

const create = catchAsync(async (req: Request, res: Response) => {
  const result = await cartService.create(req.body);
  sendResponse(res, { statusCode: status.CREATED, success: true, message: "Created successfully", data: result });
});

const getAll = catchAsync(async (req: Request, res: Response) => {
  const result = await cartService.getAll(req.query);
  sendResponse(res, { statusCode: status.OK, success: true, message: "Fetched successfully", data: result });
});

const getById = catchAsync(async (req: Request, res: Response) => {
  const result = await cartService.getById(req.params.id);
  sendResponse(res, { statusCode: status.OK, success: true, message: "Fetched successfully", data: result });
});

const update = catchAsync(async (req: Request, res: Response) => {
  const result = await cartService.update(req.body);
  sendResponse(res, { statusCode: status.OK, success: true, message: "Updated successfully", data: result });
});

const deleteEntity = catchAsync(async (req: Request, res: Response) => {
  await cartService.delete(req.params.id);
  sendResponse(res, { statusCode: status.OK, success: true, message: "Deleted successfully",data: null });
});

const bulkDelete = catchAsync(async (req: Request, res: Response) => {
  const ids: string[] = req.body.ids;  // Expecting an array of IDs to be passed for bulk delete
  if (!Array.isArray(ids) || ids.length === 0) {
    return sendResponse(res, { statusCode: status.BAD_REQUEST, success: false, message: "Invalid IDs array" ,data: null,});
  }
  await cartService.bulkDelete(ids);
  sendResponse(res, { statusCode: status.OK, success: true, message: "Bulk delete successful" ,data: null});
});

export const cartController = { create, getAll, getById, update, delete: deleteEntity, bulkDelete };
