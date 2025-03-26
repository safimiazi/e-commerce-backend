import mongoose from "mongoose";

const usersSchema = new mongoose.Schema(
  {
    phone: { type: String, required: true, unique: true },
    email: { type: String, unique: true, sparse: true },
    password: { type: String },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    name: { type: String },
    address: { type: String },
  },
  { timestamps: true }
);

export const usersModel = mongoose.model("user", usersSchema);
