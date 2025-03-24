import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },

        quantity: {
          type: Number,
          required: true,
          min: 1,
          default: 1,
        },
        variant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "AttributeOption",
            required: true,
          },
        price: {
          type: Number,
          required: true,
        },
        totalPrice: {
          type: Number,
          required: true,
        },
      },
    ],
    cartTotalCost: {
      type: Number,
      required: true,
      default: 0,
    },
    isCheckout: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true });

  // Auto-update cart total before saving
  cartSchema.pre("save", function (next) {
    this.cartTotalCost = this.products.reduce((total, item) => total + item.totalPrice, 0);
    next();
  });

export const cartModel = mongoose.model("cart", cartSchema);