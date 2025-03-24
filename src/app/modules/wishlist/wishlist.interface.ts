import { ObjectId } from "mongoose";

export interface Iwishlist {
    user: ObjectId;
    products: ObjectId[];
}