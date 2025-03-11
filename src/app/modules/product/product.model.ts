// product.model.ts - product module
import mongoose, { Schema } from "mongoose";
import { IProduct } from "./product.interface";

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    images: { type: [String], required: true },
    isDelete: { type: Boolean, default: false },
    stock: { type: Number, required: true, min: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date , default: Date.now },
  },
  {
    timestamps: true, 
  }
);

const ProductModel = mongoose.model<IProduct>("Product", ProductSchema);

export default ProductModel;
