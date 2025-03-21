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
  const body : any = {
    ...req.body,
    productBuyingPrice: Number(req.body.productBuyingPrice),
    productSellingPrice: Number(req.body.productSellingPrice),
    productOfferPrice: Number(req.body.productOfferPrice),
    productStock: Number(req.body.productStock),
    isFeatured:  Boolean(req.body.isFeatured),
    variantcolor: JSON.parse(req.body.variantcolor),
}

req.body = body

console.log(req.body)
res.send(req.body)
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
