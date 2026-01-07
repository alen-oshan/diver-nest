import mongoose from "mongoose";

const validator = require('validator');

const UserSchema = new mongoose.Schema(
  {
      name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: validator.isEmail,
        message: 'Please enter a valid email address'
      }
    },

    phone: {
      type: String,
      required: true,
      validate: {
        validator: (v) => !v || validator.isMobilePhone(v, 'any'),
        message: 'Please enter a valid phone number'
      }
    },

    role: {
      type: String,
      enum: ["admin", "customer"],
      default: "customer",
    },

    passwordHash: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User ||
  mongoose.model("User", UserSchema);
