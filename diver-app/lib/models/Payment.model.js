import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
    },

    paymentId: {
      type: String,
      required: true,
    },

    capturedAmount: {
      type: Number,
      required: true,
    },

    payhereAmount: {
      type: Number,
      required: true,
    },

    payhereCurrency: {
      type: String,
      required: true,
      default: "LKR",
    },

    statusCode: {
      type: String,
      required: true,
      enum: ["-2", "-1", "0", "1", "2"], // -2: Failed, -1: Canceled, 0: Pending, 1: Success, 2: Chargedback
    },

    statusMessage: {
      type: String,
    },

    md5sig: {
      type: String,
      required: true,
    },

    method: {
      type: String, // VISA, MASTER, AMEX, etc.
    },

    cardHolderName: {
      type: String,
    },

    cardNo: {
      type: String, // Masked card number
    },

    cardExpiry: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Payment = mongoose.models.Payment || mongoose.model("Payment", PaymentSchema);

export default Payment;
