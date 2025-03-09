// categories.interface.ts - categories module
import { ObjectId } from "mongodb";

// Category Interface
export interface ICategory {
  _id: ObjectId;
  name: string; // Unique category name
  description: string;
  createdAt: Date;
  updatedAt: Date;
}
