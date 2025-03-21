import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    skuCode: { type: String, required: true, unique: true },
    productCategory: { type: String, required: true },
    productBrand: { type: String, required: true },
    productWeight: { type: String },
    productUnit: { type: String, required: true },
    productPurchasePoint: { type: String },
    productBuyingPrice: { type: Number, required: true },
    productSellingPrice: { type: Number, required: true },
    productOfferPrice: { type: Number },
    productStock: { type: Number, required: true },
    isFeatured: { type: Boolean, default: false },
    productDescription: { type: String },
    productFeatureImage: { type: String },
    productImages: [{ type: String }],
    variant: { type: String, default: null},
    variantcolor: [{ type: String }],
    isDelete: { type: Boolean, default: false},
  },
  { timestamps: true }
);

export const productModel = mongoose.model("product", productSchema);
