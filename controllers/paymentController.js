const midtransClient = require("midtrans-client");
const Transaction = require("../models/Transaction");

// Create Snap API instance for sandbox
const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
});

// Create payment for a transaction
const createPayment = async (req, res) => {
  try {
    const { transactionId } = req.params;
    console.log("Creating payment for transaction:", transactionId);

    // Find transaction
    const transaction = await Transaction.findOne({ transactionId });
    if (!transaction) {
      console.log("Transaction not found:", transactionId);
      return res.status(404).json({ message: "Transaction not found" });
    }
    console.log("Transaction found:", JSON.stringify(transaction, null, 2));

    // Validate transaction data
    if (!transaction.totalPrice || transaction.totalPrice <= 0) {
      console.log("Invalid total price:", transaction.totalPrice);
      return res.status(400).json({ message: "Invalid total price" });
    }

    if (!transaction.products || !transaction.qty || !transaction.prices) {
      console.log("Missing required transaction data");
      return res
        .status(400)
        .json({ message: "Missing required transaction data" });
    }

    if (
      transaction.products.length !== transaction.qty.length ||
      transaction.products.length !== transaction.prices.length
    ) {
      console.log("Mismatched array lengths:", {
        products: transaction.products.length,
        qty: transaction.qty.length,
        prices: transaction.prices.length,
      });
      return res
        .status(400)
        .json({ message: "Invalid transaction data structure" });
    }

    // Generate unique order ID
    const orderId = `ORDER-${transactionId}-${Date.now()}`;
    console.log("Generated order ID:", orderId);

    // Create transaction parameter for Snap
    const parameter = {
      transaction_details: {
        order_id: orderId,
        gross_amount: transaction.totalPrice,
      },
      credit_card: {
        secure: true,
      },
      customer_details: {
        first_name: transaction.user,
        email: req.body.email || "customer@example.com",
        phone: req.body.phone || "08123456789",
      },
      item_details: transaction.products.map((product, index) => ({
        id: `ITEM-${index}`,
        price: transaction.prices[index],
        quantity: transaction.qty[index],
        name: product,
      })),
      callbacks: {
        finish: `${process.env.FRONTEND_URL}/payment-success`,
        error: `${process.env.FRONTEND_URL}/payment-status/${transactionId}`,
        pending: `${process.env.FRONTEND_URL}/payment-instructions/${transactionId}`,
      },
    };
    console.log("Payment parameter:", JSON.stringify(parameter, null, 2));

    try {
      const snapResponse = await snap.createTransaction(parameter);
      console.log("Snap response:", JSON.stringify(snapResponse, null, 2));

      // Update transaction with payment details
      transaction.paymentId = orderId;
      transaction.paymentStatus = "pending";
      transaction.paymentDetails = {
        ...snapResponse,
        parameter,
      };
      await transaction.save();

      // Pastikan format response sesuai
      res.status(200).json({
        status: "success",
        message: "Payment created successfully",
        data: {
          token: snapResponse.token, // Pastikan ini ada
          redirect_url: snapResponse.redirect_url,
          transaction_id: transactionId,
          order_id: orderId,
        },
      });
    } catch (snapError) {
      console.error("Midtrans Snap API Error:", snapError);
      return res.status(500).json({
        message: "Failed to create payment",
        error: snapError.message,
        details: snapError.response?.data || null,
      });
    }
  } catch (error) {
    console.error("Payment error:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};

// Handle notification from Midtrans
const handleNotification = async (req, res) => {
  try {
    const notification = req.body;

    // Get order ID and transaction status
    const orderId = notification.order_id;
    const transactionStatus = notification.transaction_status;
    const fraudStatus = notification.fraud_status;
    const paymentType = notification.payment_type;

    // Find transaction by payment ID
    const transaction = await Transaction.findOne({ paymentId: orderId });
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    let paymentStatus;
    // Update transaction status based on payment type and transaction status
    if (paymentType === "credit_card") {
      if (transactionStatus === "capture") {
        if (fraudStatus === "challenge") {
          paymentStatus = "challenge";
        } else if (fraudStatus === "accept") {
          paymentStatus = "success";
        }
      } else if (transactionStatus === "deny") {
        paymentStatus = "failed";
      }
    } else if (["gopay", "shopeepay", "qris"].includes(paymentType)) {
      if (transactionStatus === "settlement") {
        paymentStatus = "success";
      } else if (transactionStatus === "pending") {
        paymentStatus = "pending";
      } else if (["cancel", "expire"].includes(transactionStatus)) {
        paymentStatus = "failed";
      }
    } else if (["bank_transfer", "echannel"].includes(paymentType)) {
      if (transactionStatus === "settlement") {
        paymentStatus = "success";
      } else if (transactionStatus === "pending") {
        paymentStatus = "pending";
      } else if (["expire", "cancel", "deny"].includes(transactionStatus)) {
        paymentStatus = "failed";
      }
    }

    // Update transaction
    if (paymentStatus === "success") {
      transaction.status = "done";
    }
    transaction.paymentStatus = paymentStatus;
    transaction.paymentDetails = {
      ...transaction.paymentDetails,
      notification,
    };
    await transaction.save();

    res.status(200).json({ status: "success" });
  } catch (error) {
    console.error("Notification error:", error);
    res.status(500).json({ error: error.message });
  }
};

// Get payment status
const getPaymentStatus = async (req, res) => {
  try {
    const { transactionId } = req.params;

    // Find transaction
    const transaction = await Transaction.findOne({ transactionId });
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    // Check if payment exists
    if (!transaction.paymentId) {
      return res
        .status(404)
        .json({ message: "Payment not found for this transaction" });
    }

    // Get status from Midtrans
    const statusResponse = await snap.transaction.status(transaction.paymentId);

    res.status(200).json({
      status: "success",
      data: {
        transactionId: transaction.transactionId,
        paymentId: transaction.paymentId,
        paymentStatus: transaction.paymentStatus,
        details: statusResponse,
      },
    });
  } catch (error) {
    console.error("Get status error:", error);
    res.status(500).json({ error: error.message });
  }
};

// Update payment status
const updatePaymentStatus = async (req, res) => {
  try {
    const { transactionId } = req.params;
    const { paymentId, paymentStatus, paymentDetails } = req.body;

    // Find transaction
    const transaction = await Transaction.findOne({ transactionId });
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    // Update payment details
    transaction.paymentId = paymentId;
    transaction.paymentStatus = paymentStatus;
    transaction.paymentDetails = paymentDetails;

    // If payment is successful, update transaction status
    if (paymentStatus === "success") {
      transaction.status = "done";
    }

    await transaction.save();

    res.status(200).json({
      status: "success",
      message: "Payment status updated successfully",
      data: transaction,
    });
  } catch (error) {
    console.error("Update payment status error:", error);
    res.status(500).json({
      message: "Failed to update payment status",
      error: error.message,
    });
  }
};

module.exports = {
  createPayment,
  handleNotification,
  getPaymentStatus,
  updatePaymentStatus,
};
