/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { orderService } from "./order.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import status from "http-status";
import { productModel } from "../product/product.model";
import config from "../../config";
import SSLCommerzPayment from 'sslcommerz-lts'

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
  const orderData = req.body;
  const { customer, items, subtotal, total, delivery } = orderData;

  // Generate unique transaction ID
  const tran_id = `ORDER_${new Date().getTime()}`;

  // find products with product id:
  
  const products = await productModel.find({
    _id: { $in: items.map((item : any) =>  item.product) }
  }).populate("productCategory");




  // Prepare product information for SSLCommerz
  const productNames = products.map(product => product.productName);
  const productCategories  = products.map(product => (product as any).productCategory.name) 


  const post_body = {
    total_amount: total,
    currency: 'BDT',
    tran_id: tran_id,
    success_url: `${config.base_url}/api/payments/success/${tran_id}`,
    fail_url: `${config.base_url}/api/payments/fail/${tran_id}`,
    cancel_url: `${config.base_url}/api/payments/cancel/${tran_id}`,
    ipn_url: `${config.base_url}/api/payments/ipn`,
    
    // Customer information
    cus_name: customer.name,
    cus_email: customer.email,
    cus_phone: customer.phone,
    cus_address: customer.address,

    
    // Shipping information
    shipping_method: delivery.location === 'inside' ? 'NO' : 'YES',
    num_of_item: items.length,
    product_name: productNames,
    product_category: productCategories,

  };

  const sslcz = new SSLCommerzPayment(config.store_id, config.store_password, config.is_live);
  try {
    // Initiate the payment
    const apiResponse = await sslcz.init(post_body);
    console.log("sss", apiResponse);

    // Save the order to your database here with status 'pending'
    // await OrderService.createOrder({
    //   ...orderData,
    //   transactionId: tran_id,
    //   paymentStatus: 'pending'
    // });

    if (apiResponse?.GatewayPageURL) {
      res.status(status.OK).json({
        statusCode: status.OK,
        success: true,
        message: 'Payment initiated successfully',
        data: {
          payment_url: apiResponse.GatewayPageURL,
          transaction_id: tran_id,
        },
      });
    } else {
      res.status(status.BAD_REQUEST).json({
        statusCode: status.BAD_REQUEST,
        success: false,
        message: 'Failed to initiate payment',
        error: apiResponse?.failedreason || 'Unknown error',
      });
    }
  } catch (error) {
    res.status(status.INTERNAL_SERVER_ERROR).json({
      statusCode: status.INTERNAL_SERVER_ERROR,
      success: false,
      message: 'Error while initiating payment',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
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
  sslcommerz
};
