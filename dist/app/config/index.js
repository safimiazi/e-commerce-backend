"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), ".env") });
exports.default = {
    PORT: process.env.PORT,
    DATABASE_URL: process.env.DATABASE_URL,
    SALT: Number(process.env.SALT_ROUND),
    node_env: process.env.NODE_ENV,
    jwt_access_secret: process.env.JWT_ACCESS_SECRET,
    jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
    jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
    jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
    base_url: process.env.BASE_URL,
    store_id: process.env.STORE_ID,
    store_password: process.env.STORE_PASSWORD,
    is_live: process.env.IS_LIVE,
    FRONTEND_URL: process.env.FRONTEND_URL,
};
