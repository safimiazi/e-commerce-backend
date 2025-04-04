import express from "express";
import { carouselController } from "./carousel.controller";
import { photoComposure } from "../../middlewares/photoComposure";
import { uploadService } from "../upload/upload";

const router = express.Router();
const { configurableCompression } = photoComposure();

router.post(
  "/createCarousel",
  uploadService.single("image"),
  configurableCompression("jpeg", 60),
  carouselController.create
);
router.get("/get-all", carouselController.getAll);
router.get("/:id", carouselController.getById);
router.put("/:id", carouselController.update);
router.delete("/deleteCarousel/:id", carouselController.delete);
router.delete("/bulk", carouselController.bulkDelete);

export const carouselRoutes = router;
