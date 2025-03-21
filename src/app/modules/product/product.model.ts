import mongoose, { Types } from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    skuCode: { type: String, required: true, unique: true },
    productCategory: { type: Types.ObjectId, ref: "Category", required: true },
    productBrand: { type: Types.ObjectId, ref: "Brand", required: true },
    productWeight: { type: String },
    productUnit: { type: Types.ObjectId, ref: "Unit", required: true },    productPurchasePoint: { type: String },
    productBuyingPrice: { type: Number, required: true },
    productSellingPrice: { type: Number, required: true },
    productOfferPrice: { type: Number },
    productStock: { type: Number, required: true },
    isFeatured: { type: Boolean, default: false },
    productDescription: { type: String },
    productFeatureImage: { type: String },
    productImages: [{ type: String }],
    variant: { type: Types.ObjectId, ref: "Attribute", default: null },
    variantcolor: { type: [{ type: Types.ObjectId, ref: "AttributeOption" }], default: [] },
    isDelete: { type: Boolean, default: false},
  },
  { timestamps: true }
);

export const productModel = mongoose.model("product", productSchema);
