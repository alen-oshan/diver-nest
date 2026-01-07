import mongoose from "mongoose";

const VehicleSchema = new mongoose.Schema(
  {
    vehicleNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    brand: {
      type: String,
      required: true,
      trim: true,
    },
    model: {
      type: String,
      trim: true,
    },
    seatCapacity: {
      type: Number,
      required: true,
      min: 1,
    },
    type: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    pricePerDay: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ["available", "booked", "not available"],
      default: "available",
    },
    features: {
      type: [String],
    },
    images: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Vehicle ||
  mongoose.model("Vehicle", VehicleSchema);