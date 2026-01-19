import mongoose from "mongoose";

const ResortBookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    userEmail: {
      type: String,
      required: true,
    },

    resortId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resort",
      required: true,
    },

    resortName: {
      type: String,
      required: true,
    },

    checkInDate: {
      type: Date,
      required: true,
    },

    checkOutDate: {
      type: Date,
      required: true,
    },

    roomsBooked: {
      type: Number,
      required: true,
      min: 1,
    },

    bookingStatus: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed"],
      default: "pending",
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    specialRequests: {
      type: String,
      maxLength: 1000,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.ResortBooking ||
  mongoose.model("ResortBooking", ResortBookingSchema);