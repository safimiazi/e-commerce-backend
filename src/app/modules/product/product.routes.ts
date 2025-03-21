/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { productController } from "./product.controller";
import { productValidation } from "./product.validation";
import { photoComposure } from "../../middlewares/photoComposure";
import { uploadService } from "../upload/upload";

const router = express.Router();
const { configurableCompression } = photoComposure();

router.post(
  "/create",
  uploadService.fields([
    { name: "productFeatureImage", maxCount: 1 },
    { name: "productImages", maxCount: 10 },
  ]),
  configurableCompression("jpeg", 60),
  (req, res, next) => {
    try {
      const body: any = {
        ...req.body,
        productBuyingPrice: Number(req.body.productBuyingPrice),
        productSellingPrice: Number(req.body.productSellingPrice),
        productOfferPrice: Number(req.body.productOfferPrice),
        productStock: Number(req.body.productStock),
        isFeatured: Boolean(req.body.isFeatured),
        variantcolor: JSON.parse(req.body.variantcolor),
        productFeatureImage:
          req.files && (req.files as any).productFeatureImage.length
            ? (req.files as any).productFeatureImage[0].path
            : null,
        productImages:
          req.files && (req.files as any).productImages
            ? (req.files as any).productImages.map((f: any) => f.path)
            : [],
      };

      req.body = body;

      next();
    } catch (error) {
      console.error("Error processing request:", error);
      res.status(400).json({ error: "Invalid request format" });
    }
  },
  validateRequest(productValidation),
  productController.create
);
router.get("/", productController.getAll);
router.get("/:id", productController.getById);
router.put("/:id", productController.update);
router.delete("/:id", productController.delete);
router.delete("/bulk", productController.bulkDelete);

export const productRoutes = router;
