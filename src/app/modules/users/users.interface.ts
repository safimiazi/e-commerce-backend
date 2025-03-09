// users.interface.ts - users module
import { ObjectId } from "mongodb";

interface IAddress {
    street: string;
    city: string;
    state?: string;
    postalCode: string;
    floorNumber?: string; // Floor number (e.g., "3rd Floor", "5A")
    apartment?: string; // Apartment/Flat number
  }

export interface User {
  _id?: ObjectId;
  name: string;
  phone: string;
  email: string;
  password: string;
  role: "customer" | "admin";
  address?: IAddress[];
  createdAt?: Date;
  updatedAt?: Date;
}
