import { ObjectId } from "mongoose";



export interface IProduct {
  productName: string;
  skuCode: string;
  productBrand: ObjectId | null;
  productCategory: ObjectId | null;
  productGeneric: ObjectId | null;
  productWeight: string;
  productUnit: ObjectId | null;
  productPurchasePoint: string;
  productTags?: string[];
  productBuyingPrice: string;
  productSellingPrice: string;
  productOfferPrice?: string;
  productStock: string;
  productFeatureImage?: string;
  productImages?: string[];
  productDescription?: string;
  isFeatured?: "yes" | "not";
  variants?: ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}
