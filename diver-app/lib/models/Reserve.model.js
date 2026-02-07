import mongoose from "mongoose";

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

        isTemp: {
            type: Boolean,
            default: false,
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