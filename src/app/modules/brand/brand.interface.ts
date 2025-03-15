
// Brand.interface.ts - Brand module
export interface IBrand {
    name: string;
    isFeatured:boolean;
    image: string;
    status: "active" | "Inactive";
    isDelete: boolean;
  }
  