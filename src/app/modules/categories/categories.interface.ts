
// Category Interface
export interface ICategory {
  name: string; // Unique category name
  description: string;
  isDelete: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
