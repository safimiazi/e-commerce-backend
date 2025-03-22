import { ObjectId } from "mongoose";

// interfaces/IProduct.ts
export interface IProduct {
    productName: string;
    skuCode: string;
    productCategory: ObjectId;
    productBrand: ObjectId;
    productWeight?: string;
    productUnit: ObjectId;
    productPurchasePoint?: string;
    productBuyingPrice: number;
    productSellingPrice: number;
    productOfferPrice?: number;
    productStock: number;
    isFeatured: boolean;
    haveVarient: boolean;
    productDescription?: string;
    productFeatureImage?: string;
    productImages: string[];
    variant?: ObjectId;
    variantcolor?: ObjectId[];
    isDelete?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
  }
  
 