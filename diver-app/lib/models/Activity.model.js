import mongoose from "mongoose";

const ActivitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
      maxLength: 50,
    },

    type: {
      type: String,
      enum: ["single", "group"],
      default: "single",
      required: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    images: {
      type: [String],
    },

    rating: {
      type:Number,
      min: 0,
      max: 6,
    },

    mapUrl: {
      type:String,
      required:true,
    },

    totalSeats: {
      type: Number,
      required: true,
      min: 1,
    },

    availableTimes:{
      type: [String],
      required: true,
    },

    description: {
      type: String,
      maxLength: 1000,
      trim: true,
      required: true,
    },
    
    
    status: {
      type: String,
      enum: ["available", "not available"],
      default: "available",
    },
    
    duration: {
      type: Number, // Duration in minutes
    },

    town: {
      type: String, 
      required:true,
    },

    amenities: {
      type:[String],
      required:true,
    },
    
    reviewCount:{
      type: Number,
      min: 0,
      required:true,
    },
  },
  {
    collection: "activities",
    timestamps: true,
  }
);

export default mongoose.models.Activity ||
  mongoose.model("Activity", ActivitySchema);