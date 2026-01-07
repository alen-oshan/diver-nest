import mongoose from "mongoose";

const ResortBookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    resortId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resort",
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
    guestsCount: {
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
      default: Date.now,
    }
  },
  {
    timestamps: true,
  }
);

// Validate dates
ResortBookingSchema.pre('save', function(next) {
  if (this.checkInDate && this.checkInDate < new Date()) {
    return next(new Error('Check-in date cannot be in the past'));
  }
  
  if (this.checkOutDate && this.checkInDate && this.checkOutDate <= this.checkInDate) {
    return next(new Error('Check-out date must be after check-in date'));
  }
  
  next();
});

export default mongoose.models.ResortBooking ||
  mongoose.model("ResortBooking", ResortBookingSchema);