// categories.routes.ts - categories module
import express from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { createProductValidationSchema, updateProductValidationSchema } from "./product.validation";
import { productController } from "./product.controller";


const router = express.Router();




router.post("/post_product",validateRequest(createProductValidationSchema) , productController.postProduct);
router.put("/put_product/:id",validateRequest(updateProductValidationSchema), productController.updateProduct );
router.get("/get_products", productController.getProducts );
router.get("/get_product/:id", productController.getProductById );
router.delete("/delete_product/:id", productController.deleteProduct  );


export const productRoutes = router;