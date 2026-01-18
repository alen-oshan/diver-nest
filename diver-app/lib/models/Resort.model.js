import mongoose from "mongoose";


const ResortSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
      maxLength: 100,
    },

    address: {
      type: String,
      required: true,
      trim: true,
    },

    mapUrl: {
      type: String,
      required:true,
    },

    totalRooms: {
      type: Number,
      required: true,
      min: 1,
    },
    
    reviewCount:{
      type: Number,
      min: 0,
      required:true,
    },
    
    status: {
      type: String,
      enum: ["available", "fully_booked"],
      default: "available",
    },

    images: {
      type: [String],
    },

    description: {
      type: [String],
    },

    roomType: {
      type: String,
      enum:["Single Room", "Shared Room"],
      default:"Single Room",
    },

    pricePerNight: {
      type: Number,
      required:true, 
      min:0,
    },

    rating: {
      type: Number,
      min:0,
      max:5,
    },

    offers: {
      type: [String],
      required: true,
    },

    town: {
      type: String,
      required:true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Resort ||
  mongoose.model("Resort", ResortSchema);