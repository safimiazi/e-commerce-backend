import { ObjectId } from "mongoose";

// Category Interface
export interface ICategory {
  name: string; // Unique category name
  parentCategory: ObjectId;
  status: "active" | "inactive"
  description: string;
  isDelete: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
