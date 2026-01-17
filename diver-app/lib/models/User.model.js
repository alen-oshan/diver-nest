import mongoose from "mongoose";
import validator from 'validator';

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
      sparse: true,
      validate: {
        validator: validator.isEmail,
        message: 'Please enter a valid email address'
      }
    },

    phone: {
      type: String,
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

    password: {
      type: String,
      required: true,
    },

    emailVerified: {
      type: Boolean,
      default: false,
    },

    image: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User ||
  mongoose.model("User", UserSchema);
