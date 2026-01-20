import mongoose from "mongoose";
import { Activity } from "react";
import validator from 'validator'

const CartSchema = new mongoose.Schema(
  {
    ResortName: {
        type: String, 
    },

    ActivityName: {
        type: String,
    },
    
    checkInDate: {
        type: Date,
    },

    checkOutDate: {
        type: Date,
    },

    bookingDate: {
        type: Date
    }
  },

)

export default mongoose.models.Cart ||
  mongoose.model("Contact", ContactSchema);