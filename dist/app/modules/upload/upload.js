"use strict";
// import multer, { StorageEngine } from "multer";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadService = void 0;
// const storage: StorageEngine = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads");
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });
// const uploadService = multer({
//   storage,
// });
// export { uploadService };
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const os_1 = __importDefault(require("os"));
// সার্ভারলেস-ফ্রেন্ডলি আপলোড ডিরেক্টরি
const getUploadDir = () => {
    // লোকাল ডেভেলপমেন্টের জন্য প্রজেক্ট রুটে uploads ডিরেক্টরি
    if (process.env.NODE_ENV !== 'production') {
        const dir = path_1.default.join(process.cwd(), 'uploads');
        if (!fs_1.default.existsSync(dir)) {
            fs_1.default.mkdirSync(dir, { recursive: true });
        }
        return dir;
    }
    // প্রডাকশনে শুধুমাত্র /tmp ব্যবহার করুন
    const dir = path_1.default.join(os_1.default.tmpdir(), 'uploads');
    if (!fs_1.default.existsSync(dir)) {
        fs_1.default.mkdirSync(dir, { recursive: true });
    }
    return dir;
};
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, getUploadDir());
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path_1.default.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
});
const uploadService = (0, multer_1.default)({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB লিমিট
    }
});
exports.uploadService = uploadService;
