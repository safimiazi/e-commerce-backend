// categories.model.ts - categories module
import mongoose, { Schema } from "mongoose";
import { ICategory } from "./categories.interface";

// Category Schema definition
const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
      unique: true, // Ensure category names are unique
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    isDelete: {
      type: Boolean,
      default: false
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Category Model
const categoryModel = mongoose.model<ICategory>("Category", categorySchema);

export default categoryModel;
