/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from "express";
import { carouselService } from "./carousel.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import status from "http-status";
import { carouselModel } from "./carousel.model";
import fs from "fs";
import path from "path";
const create = catchAsync(async (req: Request, res: Response) => {
  const result = await carouselService.create({
    ...req.body,
    image: req.file ? req.file.path : undefined,
  });
  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: "Created successfully",
    data: result,
  });
});

const getAll = catchAsync(async (req: Request, res: Response) => {
  const result = await carouselService.getAll(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Fetched successfully",
    data: result,
  });
});

const getById = catchAsync(async (req: Request, res: Response) => {
  const result = await carouselService.getById(req.params.id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Fetched successfully",
    data: result,
  });
});

const update = catchAsync(async (req: Request, res: Response) => {
  const result = await carouselService.update(req.body);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Updated successfully",
    data: result,
  });
});

const deleteEntity = catchAsync(async (req: Request, res: Response) => {
  // Find the carousel item to get the image path
  const carouselItem = await carouselModel.findOne({ _id: req.params.id });

  if (!carouselItem) {
    return sendResponse(res, {
      statusCode: status.NOT_FOUND,
      success: false,
      message: "Carousel not found",
      data: null,
    });
  }

  try {
    // Delete the image file
    if (carouselItem.image) {
      // Construct absolute path - adjust based on your project structure
      const imagePath = path.join(process.cwd(), carouselItem.image);


      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
        throw new Error("File deleted successfully");
      } else {
        throw new Error(`File not found at path: ${imagePath}`);
      }
    }

    // Delete the database record
    await carouselService.delete(req.params.id);

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Carousel and associated image deleted successfully",
      data: null,
    });
  } catch (error: unknown) {
    // Handle filesystem errors
    sendResponse(res, {
      statusCode: status.INTERNAL_SERVER_ERROR,
      success: false,
      message: "Error deleting carousel image",
      data: null,
    });
  }
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
  await carouselService.bulkDelete(ids);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Bulk delete successful",
    data: null,
  });
});

export const carouselController = {
  create,
  getAll,
  getById,
  update,
  delete: deleteEntity,
  bulkDelete,
};
