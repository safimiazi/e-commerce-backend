/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { productController } from "./product.controller";
import {
  productUpdateValidation,
  productValidation,
} from "./product.validation";
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
        productBuyingPrice: Number(req.body.productBuyingPrice) || 0,
        productSellingPrice: Number(req.body.productSellingPrice) || 0,
        productOfferPrice: Number(req.body.productOfferPrice) || 0,
        productStock: Number(req.body.productStock) || 0,
        isFeatured: Boolean(req.body.isFeatured),
        haveVarient: Boolean(req.body.haveVarient),
        variant:
          req.body.variant && req.body.variant !== "null"
            ? req.body.variant
            : null, // ✅ Fix ObjectId issue

        variantcolor: req.body.variantcolor || null,
        productFeatureImage:
          req.files && (req.files as any).productFeatureImage
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
router.put(
  "/:id",
  uploadService.fields([
    { name: "productFeatureImage", maxCount: 1 },
    { name: "productImages", maxCount: 10 },
  ]),
  configurableCompression("jpeg", 60),
  (req, res, next) => {
    try {
      const body: any = {
        ...req.body,
        productBuyingPrice: Number(req.body.productBuyingPrice) || 0,
        productSellingPrice: Number(req.body.productSellingPrice) || 0,
        productOfferPrice: Number(req.body.productOfferPrice) || 0,
        productStock: Number(req.body.productStock) || 0,
        isFeatured: Boolean(req.body.isFeatured),
        haveVarient: Boolean(req.body.haveVarient),
        variant:
          req.body.variant && req.body.variant !== "null"
            ? req.body.variant
            : null, // ✅ Fix ObjectId issue

        variantcolor: req.body.variantcolor || null,
        productFeatureImage:
          req.files && (req.files as any).productFeatureImage
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
  validateRequest(productUpdateValidation),
  productController.update
);
router.delete("/:id", productController.delete);
router.post("/bulk", productController.bulkDelete);

export const productRoutes = router;
