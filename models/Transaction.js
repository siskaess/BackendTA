const { required } = require("joi");
const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    transactionId: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    products: {
      type: [String],
      required: true,
    },
    qty: {
      type: [Number],
      required: true,
    },
    prices: {
      type: [Number],
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
    },
    // New fields for payment
    paymentId: {
      type: String,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "success", "failed", "challenge"],
      default: "pending",
    },
    paymentDetails: {
      type: Object,
    },
    comments: {
      type: String,
      default: "",
    },
    installationService: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);
