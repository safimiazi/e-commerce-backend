// interfaces/IProduct.ts
export interface IProduct {
    productName: string;
    skuCode: string;
    productCategory: string;
    productBrand: string;
    productWeight?: string;
    productUnit: string;
    productPurchasePoint?: string;
    productBuyingPrice: number;
    productSellingPrice: number;
    productOfferPrice?: number;
    productStock: number;
    isFeatured: boolean;
    productDescription?: string;
    productFeatureImage?: string;
    productImages: string[];
    variant?: string;
    variantcolor?: string[];
    isDelete?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
  }
  
 