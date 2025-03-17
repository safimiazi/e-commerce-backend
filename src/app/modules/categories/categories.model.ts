// categories.model.ts - categories module
import mongoose, { Schema } from "mongoose";
import { ICategory } from "./categories.interface";

// Category Schema definition
const categorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, unique: true },
    parentCategory: { type: mongoose.Schema.Types.ObjectId, ref: "Category", default: null },
    status: { type: String, enum: ["active", "inactive"], required: true, default: "active" },
    description: { type: String, default: "" },
    isDelete: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Category Model
const categoryModel = mongoose.model<ICategory>("Category", categorySchema);

export default categoryModel;
