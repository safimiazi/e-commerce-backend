import mongoose from "mongoose";

const usersSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
    },
    address: [{ type: String }],
    phone: { type: String },
  },
  { timestamps: true }
);

export const usersModel = mongoose.model("user", usersSchema);
