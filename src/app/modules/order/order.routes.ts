import express from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { orderController } from "./order.controller";
import { orderValidation } from "./order.validation";

const router = express.Router();

router.post("/create", validateRequest(orderValidation), orderController.create);
router.get("/", orderController.getAll);
router.get("/:id", orderController.getById);
router.put("/:id", validateRequest(orderUpdateValidation), orderController.update);
router.delete("/:id", orderController.delete);
router.delete("/bulk", orderController.bulkDelete);

export const orderRoutes = router;