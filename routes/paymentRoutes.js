const express = require("express");
const router = express.Router();
const {
  createPayment,
  handleNotification,
  getPaymentStatus,
  updatePaymentStatus,
} = require("../controllers/paymentController");

// Create payment for a transaction
router.post("/create/:transactionId", createPayment);

// Handle notification from Midtrans
router.post("/notification", handleNotification);

// Get payment status
router.get("/status/:transactionId", getPaymentStatus);

// Update payment status
router.put("/status/:transactionId", updatePaymentStatus);

module.exports = router;
