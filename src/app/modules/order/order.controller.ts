/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { orderService } from "./order.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import status from "http-status";
import { productModel } from "../product/product.model";
import config from "../../config";
import SSLCommerzPayment from "sslcommerz-lts";
import { orderModel } from "./order.model";

const create = catchAsync(async (req: Request, res: Response) => {
  const result = await orderService.create(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: "Order Placed Successfully",
    data: result,
  });
});

const sslcommerz = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;

  const orderData = req.body;
  const { customer, items, total, delivery } = orderData;

  // Validate required fields
  if (!customer || !items || !total || !delivery) {
    return sendResponse(res, {
      statusCode: status.BAD_REQUEST,
      success: false,
      message: "Missing required fields in order data",
      data: null,
    });
  }

  // Generate unique transaction ID with more entropy
  const tran_id = `ORDER_${new Date().getTime()}_${Math.floor(Math.random() * 1000)}`;

  try {
    // Find products with proper error handling
    const products = await productModel
      .find({
        _id: { $in: items.map((item: any) => item.product) },
      })
      .populate("productCategory");

    if (products.length !== items.length) {
      return sendResponse(res, {
        statusCode: status.BAD_REQUEST,
        success: false,
        message: "Some products not found",
        data: null,
      });
    }

    // Prepare product information with fallbacks
    const productNames = products.map(
      (product) => product.productName || "Unnamed Product"
    );
    const productCategories = products.map(
      (product) => (product as any).productCategory?.name || "General"
    );

    // Configure SSLCommerz payload with all required fields
    const post_body: any = {
      total_amount: total,
      currency: "BDT",
      tran_id: tran_id,
      success_url: `${config.base_url}/api/v1/orders/payments/success/${tran_id}`,
      fail_url: `${config.base_url}/api/v1/orders/payments/fail/${tran_id}`,
      cancel_url: `${config.base_url}/api/v1/orders/payments/cancel/${tran_id}`,
      ipn_url: `${config.base_url}/api/v1/orders/payments/ipn`,

      // Customer information (all required by SSLCommerz)
      cus_name: customer.name || "Guest Customer",
      cus_email: customer.email || "no-email@example.com",
      cus_phone: customer.phone || "01700000000",
      cus_add1: customer.address || "Not Provided",

      // Shipping information
      shipping_method: delivery.location === "inside" ? "NO" : "YES",
      num_of_item: items.length,
      product_name: productNames.join(", "),
      product_category: productCategories.join(", "),
      product_profile: "general",
    };

    // Initialize SSLCommerz with sandbox credentials
    const sslcz = new SSLCommerzPayment(
      "miazi67e824ece0b11",
      "miazi67e824ece0b11@ssl",
      false // Sandbox mode
    );

    // Initiate the payment
    const apiResponse = await sslcz.init(post_body);

    // Save the order to database with pending status
    const savedOrder = await orderModel.create({
      ...orderData,
      customerId: user.id,
      transactionId: tran_id,
    });

    if (apiResponse?.GatewayPageURL) {
      return sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: "Payment initiated successfully",
        data: {
          payment_url: apiResponse.GatewayPageURL,
          transaction_id: tran_id,
          order: savedOrder,
        },
      });
    } else {
      return sendResponse(res, {
        statusCode: status.BAD_REQUEST,
        success: false,
        message: "Failed to initiate payment",
        data: apiResponse,
      });
    }
  } catch (error: unknown) {
    return sendResponse(res, {
      statusCode: status.INTERNAL_SERVER_ERROR,
      success: false,
      message: (error as any).message || "Error while initiating payment",
      data: null,
    });
  }
});

const paymentSuccess = catchAsync(async (req: Request, res: Response) => {
  const { tran_id } = req.params;

  try {
    // 1. Update order status directly (without SSLCommerz validation)
    const updatedOrder = await orderModel.updateOne(
      { transactionId: tran_id }, // Query: যেই ট্রানজ্যাকশন আইডি আছে সেটি খুঁজবে
      {
        $set: {
          status: "completed",
          updatedAt: new Date(),
        },
      }
    );

    if (!updatedOrder) {
      console.error(`Order ${tran_id} not found`);
      return res.redirect(
        `${config.FRONTEND_URL}/payment/fail/${tran_id}`
      );
    }

    console.log(`Order ${tran_id} marked as completed`);

    // 2. Redirect to frontend with success status
    return res.redirect(`${config.FRONTEND_URL}/payment/success/${tran_id}`);
  } catch (error) {
    console.error("Error in payment success handler:", error);

    // 3. Redirect to failure page with error details
    return res.redirect(`${config.FRONTEND_URL}/payment/fail/${tran_id}`);
  }
});

const paymentFail = catchAsync(async (req: Request, res: Response) => {
  const { tran_id } = req.params;

  // Update order status in database
  await orderService.update({
    transactionId: tran_id,
    paymentStatus: "failed",
  });

  // return res.redirect(`${config.frontend_url}/payment/fail?transaction_id=${tran_id}`);
});

const paymentCancel = catchAsync(async (req: Request, res: Response) => {
  const { tran_id } = req.params;

  // Update order status in database
  await orderService.update({
    transactionId: tran_id,
    paymentStatus: "cancelled",
  });

  // return res.redirect(`${config.frontend_url}/payment/cancel?transaction_id=${tran_id}`);
});

const paymentIPN = catchAsync(async (req: Request, res: Response) => {
  // Instant Payment Notification - for server-to-server communication
  const { tran_id } = req.body;

  if (req.body.status === "VALID") {
    await orderService.update({
      transactionId: tran_id,
      paymentStatus: "completed",
      paymentDetails: req.body,
    });
  }

  res.status(200).json({ status: "OK" });
});

const getAll = catchAsync(async (req: Request, res: Response) => {
  const result = await orderService.getAll(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Fetched successfully",
    data: result,
  });
});

const getById = catchAsync(async (req: Request, res: Response) => {
  const result = await orderService.getById(req.params.id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Fetched successfully",
    data: result,
  });
});

const update = catchAsync(async (req: Request, res: Response) => {
  const result = await orderService.update(req.body);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Updated successfully",
    data: result,
  });
});

const deleteEntity = catchAsync(async (req: Request, res: Response) => {
  await orderService.delete(req.params.id);
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
  await orderService.bulkDelete(ids);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Bulk delete successful",
    data: null,
  });
});

export const orderController = {
  create,
  getAll,
  getById,
  update,
  delete: deleteEntity,
  bulkDelete,
  sslcommerz,
  paymentSuccess,
  paymentFail,
  paymentCancel,
  paymentIPN,
};
