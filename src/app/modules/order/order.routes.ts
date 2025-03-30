import express from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { orderController } from "./order.controller";
import { orderValidationSchema } from "./order.validation";

const router = express.Router();

router.post("/create", validateRequest(orderValidationSchema), orderController.create);
router.post("/sslcommerz",  orderController.sslcommerz);
router.get("/", orderController.getAll);
router.get("/:id", orderController.getById);
router.put("/:id", orderController.update);
router.delete("/:id", orderController.delete);
router.delete("/bulk", orderController.bulkDelete);

export const orderRoutes = router;