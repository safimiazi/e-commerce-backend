// product.model.ts - product module
import mongoose, { Schema } from "mongoose";
import { IProduct } from "./product.interface";

const ProductSchema = new Schema<IProduct>(
  {
    productName: { type: String, required: true },
    skuCode: { type: String, required: true, unique: true },
    productBrand: { type: Schema.Types.ObjectId, ref: "Brand", default: null },
    productCategory: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
    productGeneric: {
      type: Schema.Types.ObjectId,
      ref: "Generic",
      default: null,
    },
    variantcolor: [
      { type: Schema.Types.ObjectId, ref: "AttributeOption", default: null },
    ],
    productWeight: { type: String, required: true },
    productUnit: { type: Schema.Types.ObjectId, ref: "Unit", default: null },
    productPurchasePoint: { type: String, required: true },
    productTags: [{ type: String }],
    productBuyingPrice: { type: String, required: true },
    productSellingPrice: { type: String, required: true },
    productOfferPrice: { type: String },
    productStock: { type: String, required: true },
    productFeatureImage: { type: String },
    productImages: [{ type: String }],
    productDescription: { type: String },
    isFeatured: { type: String, enum: ["yes", "not"], default: "not" },
    variant: { type: Schema.Types.ObjectId, ref: "Attribute" },
  },

  {
    timestamps: true,
  }
);

const ProductModel = mongoose.model<IProduct>("Product", ProductSchema);

export default ProductModel;
