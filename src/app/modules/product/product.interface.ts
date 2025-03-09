// product.interface.ts - product module
import { ObjectId } from "mongodb";



// Product interface
export interface IProduct {
  _id: ObjectId;
  name: string;
  description: string;
  price: number;
  category: ObjectId;  // Reference to the Categories collection
  brand: string;
  stock: number;
  images: string[];    // Array of image URLs
  createdAt: Date;
  updatedAt: Date;
}
