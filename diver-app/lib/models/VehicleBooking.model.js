import mongoose from "mongoose";

const VehicleBookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    vehicleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      required: true,
    },
    pickupDate: {
      type: Date,
      required: true,
    },
    dropDate: {
      type: Date,
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
    pickupLocation: {
      type: String,
      trim: true,
    },
    dropLocation: {
      type: String,
      trim: true,
    },
    bookingDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Validate dates
VehicleBookingSchema.pre('save', function(next) {
  if (this.pickupDate && this.pickupDate < new Date()) {
    return next(new Error('Pickup date cannot be in the past'));
  }
  
  if (this.dropDate && this.pickupDate && this.dropDate <= this.pickupDate) {
    return next(new Error('Drop date must be after pickup date'));
  }
  
  next();
});

export default mongoose.models.VehicleBooking ||
  mongoose.model("VehicleBooking", VehicleBookingSchema);