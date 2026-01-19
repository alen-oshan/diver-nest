import mongoose from "mongoose";

const ActivityBookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    activityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Activity",
      required: true,
    },
    seatsBooked: {
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
    bookingDate: {
      type: Date,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
    activityName: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["room", "activity"],
      default: "room",
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.ActivityBooking ||
  mongoose.model("ActivityBooking", ActivityBookingSchema);