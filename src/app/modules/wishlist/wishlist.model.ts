import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema(  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "product" }],
  },
  { timestamps: true });

export const wishlistModel = mongoose.model("wishlist", wishlistSchema);