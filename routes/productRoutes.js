const express = require("express");
const path = require("path");
const {
  getProducts,
  getProductByName,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

// Import the configured multer middleware (now as CommonJS)
const upload = require("../middleware/multerMiddleware"); // No .default needed

const router = express.Router();

router.get("/", getProducts);
router.get("/:name", getProductByName);
router.get("/display/:id", getProductById);

// Apply multer middleware for single image upload with field name 'image'
router.post("/", upload.single("image"), createProduct);

// Apply multer middleware for single image upload with field name 'image'
router.put("/:id", upload.single("image"), updateProduct);

router.delete("/:id", deleteProduct);

module.exports = router;
