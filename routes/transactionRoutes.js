const express = require("express");
const {
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
} = require("../controllers/transactionController");

// const upload = require('../middleware/multerMiddleware')
const router = express.Router();

router.get("/", getTransactions);
router.get("/all", getAllTransactions);
router.get("/display/:email", getTransactionByEmail);
router.get("/pending", getPendingTransactions);
router.get("/done", getDoneTransactions);
router.get("/:id", getTransactionById);
router.post("/", createTransaction);
router.put("/:id", updateTransaction);
router.put("/confirm/:id", confirmTransaction);
router.put("/cancel/:id", cancelTransaction);
router.get("/date/:startDate/:endDate", getTransactionByDateRange);

module.exports = router;