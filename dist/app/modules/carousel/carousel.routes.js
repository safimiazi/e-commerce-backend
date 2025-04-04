"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.carouselRoutes = void 0;
const express_1 = __importDefault(require("express"));
// import { carouselController } from "./carousel.controller";
// import { photoComposure } from "../../middlewares/photoComposure";
// import { uploadService } from "../upload/upload";
const router = express_1.default.Router();
// const { configurableCompression } = photoComposure();
// router.post(
//   "/createCarousel",
//   uploadService.single("image"),
//   configurableCompression("jpeg", 60),
//   carouselController.create
// );
// router.get("/get-all", carouselController.getAll);
// router.delete("/deleteCarousel/:id", carouselController.delete);
exports.carouselRoutes = router;
