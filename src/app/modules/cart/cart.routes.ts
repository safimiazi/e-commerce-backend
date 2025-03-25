import express from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { cartController } from "./cart.controller";
import { cartSchemaValidation, cartUpdateValidation } from "./cart.validation";

const router = express.Router();

router.post(
  "/create",
  validateRequest(cartSchemaValidation),
  cartController.create
);
router.post("/remove_from_cart", cartController.removeFromCart);
router.get("/", cartController.getAll);
router.get("/user_cart", cartController.getById);
router.put(
  "/:id",
  validateRequest(cartUpdateValidation),
  cartController.update
);
router.post("/product_cart_delete", cartController.delete);
router.delete("/bulk", cartController.bulkDelete);

export const cartRoutes = router;
