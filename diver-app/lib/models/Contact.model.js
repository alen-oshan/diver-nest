import mongoose from "mongoose";

const validator = require('validator');


const ContactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
      maxLength: 100,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: validator.isEmail,
        message: 'Please enter a valid email address'
      }
    },
    phone: {
      type: String,
      trim: true,
      validate: {
        validator: (v) => !v || validator.isMobilePhone(v, 'any'),
        message: 'Please enter a valid phone number'
      }
    },
    subject: {
      type: String,
      required: true,
      trim: true,
      minLength: 5,
      maxLength: 200,
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