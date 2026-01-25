import mongoose from "mongoose";
import validator from 'validator'

const ContactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
      maxLength: 50,
    },

    contact: {
      type: String,
      trim: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
      minLength: 10,
      maxLength: 2000,
    },

    status: {
      type: String,
      enum: ["new", "read", "closed"],
      default: "new",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Contact ||
  mongoose.model("Contact", ContactSchema);