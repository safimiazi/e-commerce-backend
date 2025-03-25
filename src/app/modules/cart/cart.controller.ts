/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { cartService } from "./cart.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import status from "http-status";

const create = catchAsync(async (req: Request, res: Response) => {
const user = "60b8d6d5f4b88a001f07b82e"

const result = await cartService.create(user, req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: `Product updated successfully in the cart`,
    data: result,
  });
});
const removeFromCart = catchAsync(async (req: Request, res: Response) => {
const user = "60b8d6d5f4b88a001f07b82e"

const result = await cartService.removeFromCart(user, req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: ` cart successfully removed`,
    data: result,
  });
});





const getAll = catchAsync(async (req: Request, res: Response) => {
  const result = await cartService.getAll(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Fetched successfully",
    data: result,
  });
});

const getById = catchAsync(async (req: Request, res: Response) => {
  const user = "60b8d6d5f4b88a001f07b82e"
  const result = await cartService.getById(user);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Fetched successfully",
    data: result,
  });
});

const update = catchAsync(async (req: Request, res: Response) => {
  const result = await cartService.update(req.body);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Updated successfully",
    data: result,
  });
});

const deleteEntity = catchAsync(async (req: Request, res: Response) => {
  await cartService.delete(req.params.id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Deleted successfully",
    data: null,
  });
});

const bulkDelete = catchAsync(async (req: Request, res: Response) => {
  const ids: string[] = req.body.ids; // Expecting an array of IDs to be passed for bulk delete
  if (!Array.isArray(ids) || ids.length === 0) {
    return sendResponse(res, {
      statusCode: status.BAD_REQUEST,
      success: false,
      message: "Invalid IDs array",
      data: null,
    });
  }
  await cartService.bulkDelete(ids);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Bulk delete successful",
    data: null,
  });
});

export const cartController = {
  create,
  getAll,
  getById,
  update,
  delete: deleteEntity,
  bulkDelete,
  removeFromCart
};
