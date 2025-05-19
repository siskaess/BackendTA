const Transaction = require("../models/Transaction");
const User = require("../models/User");
const Product = require("../models/Product");
const Schedule = require("../models/Schedule"); // Import the Schedule model

const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ installationService: false });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find();

    const mappedTransactions = transactions.map((transaction) => {
      return transaction;
    });

    if (req.query.sortBy && req.query.sortOrder) {
      const sortTransactions = mappedTransactions.sort((a, b) => {
        if (req.query.sortBy === "id") {
          return req.query.sortOrder === "asc"
            ? a.transactionId.localeCompare(b.transactionId)
            : b.transactionId.localeCompare(a.transactionId);
        } else if (req.query.sortBy === "amount") {
          return req.query.sortOrder === "asc"
            ? a.totalPrice - b.totalPrice
            : b.totalPrice - a.totalPrice;
        } else if (req.query.sortBy === "date") {
          return req.query.sortOrder === "asc"
            ? new Date(a.date) - new Date(b.date)
            : new Date(b.date) - new Date(a.date);
        }
      });
      return res.status(200).json(sortTransactions);
    }

    res.status(200).json(mappedTransactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPendingTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ status: "pending" });

    const mappedTransactions = transactions.map((transaction) => {
      return transaction;
    });

    if (req.query.sortBy && req.query.sortOrder) {
      const sortTransactions = mappedTransactions.sort((a, b) => {
        if (req.query.sortBy === "id") {
          return req.query.sortOrder === "asc"
            ? a.transactionId.localeCompare(b.transactionId)
            : b.transactionId.localeCompare(a.transactionId);
        } else if (req.query.sortBy === "amount") {
          return req.query.sortOrder === "asc"
            ? a.totalPrice - b.totalPrice
            : b.totalPrice - a.totalPrice;
        } else if (req.query.sortBy === "date") {
          return req.query.sortOrder === "asc"
            ? new Date(a.date) - new Date(b.date)
            : new Date(b.date) - new Date(a.date);
        }
      });
      return res.status(200).json(sortTransactions);
    }

    res.status(200).json(mappedTransactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDoneTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ status: "done" });

    const mappedTransactions = transactions.map((transaction) => {
      return transaction;
    });

    if (req.query.sortBy && req.query.sortOrder) {
      const sortTransactions = mappedTransactions.sort((a, b) => {
        if (req.query.sortBy === "id") {
          return req.query.sortOrder === "asc"
            ? a.transactionId.localeCompare(b.transactionId)
            : b.transactionId.localeCompare(a.transactionId);
        } else if (req.query.sortBy === "amount") {
          return req.query.sortOrder === "asc"
            ? a.totalPrice - b.totalPrice
            : b.totalPrice - a.totalPrice;
        } else if (req.query.sortBy === "date") {
          return req.query.sortOrder === "asc"
            ? new Date(a.date) - new Date(b.date)
            : new Date(b.date) - new Date(a.date);
        }
      });
      return res.status(200).json(sortTransactions);
    }

    res.status(200).json(mappedTransactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTransactionById = async (req, res) => {
  try {
    const id = req.params.id;
    const transaction = await Transaction.find({ transactionId: id });

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTransactionByEmail = async (req, res) => {
  try {
    const email = req.params.email;
    console.log(`Fetching transactions for email: ${email}`);

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit); // dapatkan dari query
    const skip = (page - 1) * (limit || 0); // skip hanya jika limit ada

    let query = Transaction.find({ user: email }).sort({ date: -1 });

    if (limit) {
      query = query.skip(skip).limit(limit);
    }

    const transactions = await query;

    if (!transactions || transactions.length === 0) {
      return res.status(404).json({ message: "No transactions found" });
    }

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createTransaction = async (req, res) => {
  try {
    const { products, qty, location, user } = req.body;
    let installationService = false;

    // Validate required fields
    if (!products || !qty || !location || !user) {
      console.log(products, qty, location, user);
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Validate arrays have same length
    if (products.length !== qty.length) {
      return res
        .status(400)
        .json({ message: "Products and quantities must have same length" });
    }

    // Get product prices and check stock (but don't decrement yet)
    const prices = [];
    let totalPrice = 0;
    const updatedProductsInfo = []; // To store info for transaction

    // Fetch each product, check stock, and get its price
    for (let i = 0; i < products.length; i++) {
      const productName = products[i];
      const quantity = qty[i];

      // Handle special case "Jasa Pasang"
      if (productName === "Jasa Pasang") {
        installationService = true;
        const jasaPrice = 200000;
        prices.push(jasaPrice);
        totalPrice += jasaPrice * quantity;
        updatedProductsInfo.push({ name: productName, price: jasaPrice });
        continue;
      }

      const product = await Product.findOne({ name: productName });

      if (!product) {
        return res
          .status(404)
          .json({ message: `Product "${productName}" not found` });
      }

      // Check stock availability (still important to prevent overselling)
      if (product.stock < quantity) {
        return res.status(400).json({
          message: `Insufficient stock for product "${productName}". Available: ${product.stock}, Requested: ${quantity}`,
        });
      }

      // Add price and update total price
      prices.push(product.price);
      totalPrice += product.price * quantity;

      updatedProductsInfo.push({ name: product.name, price: product.price });
    }

    // Generate transaction ID
    const transactionCount = await Transaction.countDocuments();
    const transactionId = String(transactionCount + 1).padStart(10, "0");

    // Create transaction object
    const newTransactionData = {
      transactionId,
      user,
      location,
      products: updatedProductsInfo.map((p) => p.name), // Store product names
      qty, // Store quantities
      prices, // Store prices at time of transaction
      totalPrice,
      date: new Date(),
      status: "pending", // Initial status is pending
      installationService: installationService,
    };
    const newTransactionResult = await Transaction.create(newTransactionData);
    const newTransaction = newTransactionResult;

    res.status(201).json(newTransaction);
  } catch (error) {
    console.error("Error creating transaction:", error);
    res.status(500).json({
      error: "Failed to create transaction",
      details: error.message,
    });
  }
};

const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, products, prices, totalPrice, comments } = req.body;
    const transaction = await Transaction.findById(id);
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    if (status) {
      if (status === "done") {
        const productUpdates = [];
        for (let i = 0; i < transaction.products.length; i++) {
          const productName = transaction.products[i];
          const quantity = transaction.qty[i];

          // Skip non-product items like "Jasa Pasang"
          if (productName === "Jasa Pasang") {
            continue;
          }

          // Prepare the stock decrement operation for this product
          // Use updateOne with $inc for atomic decrement
          productUpdates.push(
            Product.updateOne(
              { name: productName }, // Find product by name
              { $inc: { stock: -quantity } } // Decrement stock by quantity
            )
          );
        }

        // Execute all stock updates concurrently
        await Promise.all(productUpdates);
      }
      transaction.status = status;
    }
    if (products) {
      transaction.products = products;
    }
    if (prices) {
      transaction.prices = prices;
    }
    if (totalPrice) {
      transaction.totalPrice = totalPrice;
    }
    if (comments) {
      transaction.comments = comments;
    }
    await transaction.save();
    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const confirmTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    // GANTI INI
    const transaction = await Transaction.findOne({
      transactionId: id,
    });

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    if (transaction.status === "done") {
      return res
        .status(400)
        .json({ message: "Transaction is already confirmed" });
    }

    const productUpdates = [];
    for (let i = 0; i < transaction.products.length; i++) {
      const productName = transaction.products[i];
      const quantity = transaction.qty[i];

      if (productName === "Jasa Pasang") {
        continue;
      }

      productUpdates.push(
        Product.updateOne({ name: productName }, { $inc: { stock: -quantity } })
      );
    }

    await Promise.all(productUpdates);

    transaction.status = "done";
    await transaction.save();

    res.status(200).json({
      message: "Transaction confirmed and stock updated",
      transaction,
    });
  } catch (error) {
    console.error("Error confirming transaction:", error);
    res
      .status(500)
      .json({ error: "Failed to confirm transaction", details: error.message });
  }
};

const getTransactionByDateRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.params;

    // Log incoming parameters
    console.log(
      `Searching for transactions between ${startDate} and ${endDate}`
    );

    // Create Date objects from the input strings
    // Assumes input is YYYY-MM-DD. Adjust if needed.
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Set time for start date to the beginning of the day (00:00:00)
    start.setHours(0, 0, 0, 0);

    // Set time for end date to the end of the day (23:59:59.999)
    end.setHours(23, 59, 59, 999);

    console.log(`Converted to Date objects: Start=${start}, End=${end}`);
    console.log(start, end);

    // Validate dates
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res
        .status(400)
        .json({ message: "Invalid date format. Use YYYY-MM-DD." });
    }

    console.log(
      `Querying with Date objects: Start=${start.toISOString()}, End=${end.toISOString()}`
    );

    // Log all transactions for debugging (optional, can be removed later)
    // const allTransactions = await Transaction.find();
    // console.log(`Total transactions in database: ${allTransactions.length}`);
    // console.log(
    //   `Dates in database (as Date objects): ${allTransactions
    //     .map((t) => t.date)
    //     .join(",\n ")}`
    // );

    // Find transactions using Date objects for comparison
    const transactions = await Transaction.find({
      date: {
        $gte: start, // Use the Date object directly
        $lte: end, // Use the Date object directly
      },
    }).sort({ date: 1 }); // Sort by date ascending

    // console.log(transactions);

    // No need to remove duplicates if the query is correct
    res.status(200).json(transactions);
  } catch (error) {
    console.error("Error in getTransactionByDateRange:", error);
    res.status(500).json({ error: error.message });
  }
};

const cancelTransaction = async (req, res) => {
  try {
    const { id } = req.params; // This should be the transactionId (e.g., TRX-123) if your routes use it, or _id if they use that

    // Find the transaction - adjust find method based on what 'id' represents
    // If 'id' is transactionId:
    const transaction = await Transaction.findOne({ transactionId: id });
    // If 'id' is MongoDB _id:
    // const transaction = await Transaction.findById(id);

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    // Check if the transaction is in a cancelable state (e.g., 'pending' payment)
    if (transaction.paymentStatus !== "pending") {
      return res.status(400).json({
        message: `Cannot cancel transaction with status: ${transaction.paymentStatus}`,
      });
    }

    // --- Optional: Interact with Payment Gateway (Midtrans) ---
    // If you want to attempt cancellation with Midtrans, you'd need their API call here.
    // Example (conceptual - requires Midtrans Node library or direct API call):
    // try {
    //   const midtransResponse = await midtransClient.transaction.cancel(transaction.transactionId);
    //   console.log("Midtrans cancellation response:", midtransResponse);
    // } catch (midtransError) {
    //   console.error("Midtrans cancellation failed:", midtransError);
    //   // Decide if you still want to cancel internally even if Midtrans fails
    //   // return res.status(500).json({ message: "Failed to cancel payment with gateway." });
    // }
    // --- End Optional Midtrans Interaction ---

    // Update the transaction status internally
    transaction.status = "cancelled"; // Or a more specific status like 'payment_cancelled'
    transaction.paymentStatus = "failed"; // Update payment status as well

    await transaction.save();

    res.status(200).json({
      message: "Transaction cancelled successfully",
      transaction: transaction, // Return updated transaction
    });
  } catch (error) {
    console.error("Error cancelling transaction:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getTransactions,
  getAllTransactions,
  getTransactionById,
  getTransactionByEmail,
  getPendingTransactions,
  getDoneTransactions,
  createTransaction,
  updateTransaction,
  confirmTransaction,
  getTransactionByDateRange,
  cancelTransaction,
};
