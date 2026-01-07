import mongoose from "mongoose";

const RoomTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  capacity: {
    type: Number,
    required: true,
    min: 1
  },
  price: {
    type: Number,
    default: 0
  }
});

const ResortSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
      maxLength: 100,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    pricePerNight: {
      type: Number,
      required: true,
      min: 0,
    },
    totalRooms: {
      type: Number,
      required: true,
      min: 1,
    },
    availableRooms: {
      type: Number,
      default: function() {
        return this.totalRooms;
      },
    },
    status: {
      type: String,
      enum: ["available", "fully_booked"],
      default: "available",
    },
    images: {
      type: [String],
    },
    amenities: {
      type: [String],
    },
    roomTypes: {
      type: [RoomTypeSchema],
    },
  },
  {
    timestamps: true,
  }
);

// Virtual to ensure availableRooms doesn't exceed totalRooms
ResortSchema.pre('save', function(next) {
  if (this.availableRooms > this.totalRooms) {
    this.availableRooms = this.totalRooms;
  }
  next();
});

export default mongoose.models.Resort ||
  mongoose.model("Resort", ResortSchema);