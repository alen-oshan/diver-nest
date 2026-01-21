import mongoose from "mongoose";

const CartItemSchema = new mongoose.Schema(
  {
    resortName: {
      type: String,
    },

    activityName: {
      type: String,
    },

    checkInDate: Date,
    checkOutDate: Date,
    bookingDate: Date,

    price: {
      type: Number,
      required: true,
    },

    type: {
      type: String,
      enum: ["stay", "activity"],
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    }
  },
  { timestamps: true }
);

export default mongoose.models.CartItem ||
  mongoose.model("CartItem", CartItemSchema);
