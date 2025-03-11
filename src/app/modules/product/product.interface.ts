import { ObjectId } from "mongodb";


 export interface IProduct {
  _id: ObjectId;
  name: string;
  description: string;
  price: number;
  categoryId: ObjectId;
  images: string[];
  stock: number;
  isDelete: boolean;
  createdAt: Date;
  updatedAt: Date;
}
