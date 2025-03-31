import express from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { orderController } from "./order.controller";
import { orderValidationSchema } from "./order.validation";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post("/create", validateRequest(orderValidationSchema), orderController.create);
router.post("/sslcommerz", auth("user"),  orderController.sslcommerz);
router.post('/payments/success/:tran_id', orderController.paymentSuccess);
router.get('/payments/fail/:tran_id', orderController.paymentFail);
router.get('/payments/cancel/:tran_id', orderController.paymentCancel);
router.post('/payments/ipn', orderController.paymentIPN);
router.get("/", orderController.getAll);
router.get("/:id", orderController.getById);
router.put("/:id", orderController.update);
router.delete("/:id", orderController.delete);
router.delete("/bulk", orderController.bulkDelete);

export const orderRoutes = router;