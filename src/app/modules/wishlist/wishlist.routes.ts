import express from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { wishlistController } from "./wishlist.controller";
import { wishlistUpdateValidation, wishlistValidation } from "./wishlist.validation";

const router = express.Router();

router.post("/create", validateRequest(wishlistValidation), wishlistController.create);
router.get("/", wishlistController.getAll);
router.get("/:id", wishlistController.getById);
router.put("/:id", validateRequest(wishlistUpdateValidation), wishlistController.update);
router.delete("/:id", wishlistController.delete);
router.delete("/bulk", wishlistController.bulkDelete);

export const wishlistRoutes = router;