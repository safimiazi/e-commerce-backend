// categories.routes.ts - categories module
import express from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import {  categoryValidationSchema } from "./categories.validation";
import { categoryController } from "./categories.controller";


const router = express.Router();




router.post("/post_category",validateRequest(categoryValidationSchema), categoryController.postCategory );


export const categoryRoutes = router;