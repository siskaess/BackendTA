const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  condition: { type: String, enum: ["new", "used"], required: true },
  minPurchase: { type: Number, required: true },
  brand: { type: String, required: true },
  stock: { type: Number, required: true },
  price: { type: Number, required: true },
  description: {
    type: [String],
    required: true,
  },
  image: { type: String, required: true },
});

module.exports = mongoose.model("products", productSchema);
