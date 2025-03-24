import mongoose from "mongoose";

const couponSchema = new mongoose.Schema({}, { timestamps: true });

export const couponModel = mongoose.model("coupon", couponSchema);