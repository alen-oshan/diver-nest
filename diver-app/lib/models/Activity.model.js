import mongoose from "mongoose";

const ActivitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
      maxLength: 100,
    },
    description: {
      type: String,
      maxLength: 1000,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    totalSeats: {
      type: Number,
      required: true,
      min: 1,
    },
    status: {
      type: String,
      enum: ["available", "not available"],
      default: "available",
    },
    images: {
      type: [String],
    },
    duration: {
      type: Number, // Duration in minutes
    },
  },
  {
    collection: "activities",
    timestamps: true,
  }
);

export default mongoose.models.Activity ||
  mongoose.model("Activity", ActivitySchema);