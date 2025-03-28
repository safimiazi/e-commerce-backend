import express from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { couponController } from "./coupon.controller";
import { couponUpdateValidation } from "./coupon.validation";

const router = express.Router();

router.post("/create",  couponController.create);
router.get("/", couponController.getAll);
router.get("/:id", couponController.getById);
router.put("/:id", validateRequest(couponUpdateValidation), couponController.update);
router.delete("/:id", couponController.delete);
router.delete("/bulk", couponController.bulkDelete);

router.post("/apply", couponController.couponApply);


export const couponRoutes = router;