import mongoose from "mongoose";
import { Activity } from "react";
import validator from 'validator'

const ReserveSchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },

        checkIn: {
            type: Date,
        },

        checkOut: {
            type: Date,
        },

        activityDate: {
            type: Date
        },

        type: {
            type: String,
            enum: ["stay", "activity"],
            required: true,
        },

        quantity: {
            type: Number,
            required: true,
        },

        expiryDate: {
            type: Date,
            required: true,
        },

        userEmail: {
            type: String, 
            required:true,
        }
    },
    { timestamps: true }

)

export default mongoose.models.Reserve ||
  mongoose.model("Reserve", ReserveSchema);