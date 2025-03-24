import { Request, Response } from "express";
import { usersService } from "./users.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import status from "http-status";
import { usersValidation } from "./users.validation";

const create = catchAsync(async (req: Request, res: Response) => {
  const result = await usersService.create(req.body);
  sendResponse(res, { statusCode: status.CREATED, success: true, message: "Created successfully", data: result });
});

const getAll = catchAsync(async (req: Request, res: Response) => {
  const result = await usersService.getAll(req.query);
  sendResponse(res, { statusCode: status.OK, success: true, message: "Fetched successfully", data: result });
});

const getById = catchAsync(async (req: Request, res: Response) => {
  const result = await usersService.getById(req.params.id);
  sendResponse(res, { statusCode: status.OK, success: true, message: "Fetched successfully", data: result });
});

const update = catchAsync(async (req: Request, res: Response) => {
  const result = await usersService.update(req.body);
  sendResponse(res, { statusCode: status.OK, success: true, message: "Updated successfully", data: result });
});

const deleteEntity = catchAsync(async (req: Request, res: Response) => {
  await usersService.delete(req.params.id);
  sendResponse(res, { statusCode: status.OK, success: true, message: "Deleted successfully",data: null });
});

const bulkDelete = catchAsync(async (req: Request, res: Response) => {
  const ids: string[] = req.body.ids;  // Expecting an array of IDs to be passed for bulk delete
  if (!Array.isArray(ids) || ids.length === 0) {
    return sendResponse(res, { statusCode: status.BAD_REQUEST, success: false, message: "Invalid IDs array" ,data: null,});
  }
  await usersService.bulkDelete(ids);
  sendResponse(res, { statusCode: status.OK, success: true, message: "Bulk delete successful" ,data: null});
});

export const usersController = { create, getAll, getById, update, delete: deleteEntity, bulkDelete };
