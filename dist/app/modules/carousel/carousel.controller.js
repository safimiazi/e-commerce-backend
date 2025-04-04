"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.carouselController = void 0;
const carousel_service_1 = require("./carousel.service");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const carousel_model_1 = require("./carousel.model");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const create = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield carousel_service_1.carouselService.create(Object.assign(Object.assign({}, req.body), { image: req.file ? req.file.path : undefined }));
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "Created successfully",
        data: result,
    });
}));
const deleteEntity = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Find the carousel item to get the image path
    const carouselItem = yield carousel_model_1.carouselModel.findOne({ _id: req.params.id });
    if (!carouselItem) {
        return (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.NOT_FOUND,
            success: false,
            message: "Carousel not found",
            data: null,
        });
    }
    try {
        // Delete the image file
        if (carouselItem.image) {
            // Construct absolute path - adjust based on your project structure
            const imagePath = path_1.default.join(process.cwd(), carouselItem.image);
            if (fs_1.default.existsSync(imagePath)) {
                fs_1.default.unlinkSync(imagePath);
                throw new Error("File deleted successfully");
            }
            else {
                throw new Error(`File not found at path: ${imagePath}`);
            }
        }
        // Delete the database record
        yield carousel_service_1.carouselService.delete(req.params.id);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "Carousel and associated image deleted successfully",
            data: null,
        });
    }
    catch (error) {
        // Handle filesystem errors
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.INTERNAL_SERVER_ERROR,
            success: false,
            message: "Error deleting carousel image",
            data: null,
        });
    }
}));
const getAll = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield carousel_service_1.carouselService.getAll(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Fetched successfully",
        data: result,
    });
}));
exports.carouselController = {
    create,
    getAll,
    delete: deleteEntity,
};
