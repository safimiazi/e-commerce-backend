import { ObjectId } from "mongodb";


 export interface IProduct {
  name: string;
  description: string;
  price: number;
  category: ObjectId;
  images: string[];
  stock: number;
  isDelete: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
