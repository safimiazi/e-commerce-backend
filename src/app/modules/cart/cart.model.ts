import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({}, { timestamps: true });

export const cartModel = mongoose.model("cart", cartSchema);