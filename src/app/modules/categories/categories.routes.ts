// categories.routes.ts - categories module
import express from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import {  categoryValidationSchema, editCategoryValidationSchema } from "./categories.validation";
import { categoryController } from "./categories.controller";


const router = express.Router();




router.post("/post_category",validateRequest(categoryValidationSchema), categoryController.postCategory );
router.put("/put_category/:id",validateRequest(editCategoryValidationSchema), categoryController.putCategory );
router.get("/get_category",categoryController.getCategory );
router.delete("/delete_category/:id", categoryController.deleteCategory );


export const categoryRoutes = router;