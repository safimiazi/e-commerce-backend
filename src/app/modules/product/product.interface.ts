import { ObjectId } from "mongodb";

 export interface IReview {
  userId: ObjectId;
  comment: string;
  rating: number;
  createdAt: Date;
}

 export interface IProduct {
  _id: ObjectId;
  name: string;
  description: string;
  price: number;
  categoryId: ObjectId;
  images: string[];
  stock: number;
  rating: number;
  reviews: IReview[];
  createdAt: Date;
}
