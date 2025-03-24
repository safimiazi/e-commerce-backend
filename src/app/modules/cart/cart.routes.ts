import express from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { cartController } from "./cart.controller";
import { cartSchemaValidation, cartUpdateValidation } from "./cart.validation";

const router = express.Router();

router.post("/create", validateRequest(cartSchemaValidation), cartController.create);
router.get("/", cartController.getAll);
router.get("/:id", cartController.getById);
router.put("/:id", validateRequest(cartUpdateValidation), cartController.update);
router.delete("/:id", cartController.delete);
router.delete("/bulk", cartController.bulkDelete);

export const cartRoutes = router;