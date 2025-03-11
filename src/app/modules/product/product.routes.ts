// categories.routes.ts - categories module
import express from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import {
  createProductValidationSchema,
  updateProductValidationSchema,
} from "./product.validation";
import { productController } from "./product.controller";
import { uploadService } from "../upload/upload";
import { photoComposure } from "../../middlewares/photoComposure";

const router = express.Router();
const { configurableCompression } = photoComposure();

router.post(
  "/post_product",
  uploadService.array("images"),
  configurableCompression("jpeg", 60),

  validateRequest(createProductValidationSchema),
  productController.postProduct
);
router.put(
  "/put_product/:id",
  validateRequest(updateProductValidationSchema),
  productController.updateProduct
);
router.get("/get_products", productController.getProducts);
router.get("/get_product/:id", productController.getProductById);
router.delete("/delete_product/:id", productController.deleteProduct);

export const productRoutes = router;
