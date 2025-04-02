/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import status from "http-status";
import { ReportService } from "../../utils/reports";

const inventoryReport = catchAsync(async (req: Request, res: Response) => {
  const startDate = req.query.startDate ? new Date(req.query.startDate as string) : undefined;
  const endDate = req.query.endDate && typeof req.query.endDate === 'string' 
    ? new Date(req.query.endDate) 
    : undefined;
  const reportService = new ReportService(5); // Low stock threshold = 5

  // Generate inventory report
  const inventoryReport = await reportService.generateInventoryReport({
    startDate,
    endDate
  });

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "inventory report generated successfully",
    data: inventoryReport,
  });
});
const saleReport = catchAsync(async (req: Request, res: Response) => {
  // Validate and parse dates from query parameters
  const startDate = req.query.startDate 
    ? new Date(req.query.startDate as string)
    : new Date(new Date().setDate(new Date().getDate() - 30)); // Default to last 30 days
  
  const endDate = req.query.endDate 
    ? new Date(req.query.endDate as string)
    : new Date(); // Default to now
  const reportService = new ReportService(5); // Low stock threshold = 5

  // Generate inventory report
  const salesReport = await reportService.generateSalesReport(
    startDate,
    endDate,
    { topProductsLimit: 5, recentOrdersLimit: 5 }
  );

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Sales report generated successfully",
    data: salesReport,
  });
});

export const reportsController = {
  inventoryReport,saleReport
};
