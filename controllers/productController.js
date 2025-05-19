const Product = require("../models/Product");
const { ObjectId } = require("mongodb");
const fs = require("fs"); // Import file system module for deleting old images
const path = require("path"); // Import path module

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    // Base URL server kamu
    const baseUrl = `${req.protocol}://${req.get("host")}`;

    const mappedProducts = products.map((product) => {
      // Cek apakah image sudah url full atau masih local path
      // if (product.image && !product.image.startsWith("http")) {
      //   // Kalau bukan full URL, tambahin domain server
      //   product.image = `${baseUrl}${product.image.startsWith("/") ? "" : "/"}${
      //     product.image
      //   }`;
      // }
      return product;
    });

    if (req.query.sortBy && req.query.sortOrder) {
      const sortProducts = mappedProducts.sort((a, b) => {
        if (req.query.sortBy === "name") {
          return req.query.sortOrder === "asc"
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        } else if (req.query.sortBy === "price") {
          return req.query.sortOrder === "asc"
            ? a.price - b.price
            : b.price - a.price;
        } else if (req.query.sortBy === "type") {
          return req.query.sortOrder === "asc"
            ? a.type.localeCompare(b.type)
            : b.type.localeCompare(a.type);
        } else if (req.query.sortBy === "stock") {
          return req.query.sortOrder === "asc"
            ? a.stock - b.stock
            : b.stock - a.stock;
        }
      });
      return res.status(200).json(sortProducts);
    }

    res.status(200).json(mappedProducts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProductByName = async (req, res) => {
  try {
    const searchText = req.params.name;
    if (!searchText) {
      return res.status(200).json([]);
    }
    const products = await Product.find({
      name: { $regex: searchText, $options: "i" },
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    // const baseUrl = `${req.protocol}://${req.get("host")}`;
    // if (product.image && !product.image.startsWith("http")) {
    //   // Kalau bukan full URL, tambahin domain server
    //   product.image = `${baseUrl}${product.image.startsWith("/") ? "" : "/"}${
    //     product.image
    //   }`;
    // }
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const {
      name,
      type,
      condition,
      minPurchase,
      brand,
      stock,
      price,
      description,
    } = req.body;

    const imageFile = req.file;

    console.log("Request Body:", req.body);
    console.log("Request File:", req.file);

    if (!imageFile) {
      return res.status(400).json({ message: "Product image is required" });
    }

    if (
      !name ||
      !type ||
      !price ||
      !condition ||
      !minPurchase ||
      !brand ||
      !stock ||
      !description
    ) {
      return res.status(400).json({
        message: "All text fields are required",
      });
    }

    const parsedPrice = Number(price);
    if (isNaN(parsedPrice)) {
      return res.status(400).json({
        message: "Price must be a valid number",
      });
    }

    const parsedStock = Number(stock);
    if (isNaN(parsedStock)) {
      return res.status(400).json({
        message: "Stock must be a valid number",
      });
    }

    const parsedMinPurchase = Number(minPurchase);
    if (isNaN(parsedMinPurchase)) {
      return res.status(400).json({
        message: "Minimum purchase must be a valid number",
      });
    }

    let descriptionArray = [];

    if (description) {
      descriptionArray = description
        .toString()
        .split(",")
        .map((item) => item.trim());
    }

    if (condition !== "new" && condition !== "used") {
      return res.status(400).json({
        message: "Condition must be either 'new' or 'used'",
      });
    }

    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const imagePath = `${baseUrl}/uploads/${imageFile.filename}`;

    const product = await Product.create({
      name,
      type,
      condition,
      minPurchase: parsedMinPurchase,
      brand,
      stock: parsedStock,
      price: parsedPrice,
      description: descriptionArray,
      image: imagePath,
    });

    res.status(201).json(product);
  } catch (error) {
    console.error("Product creation error:", error);
    if (req.file) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error("Error deleting uploaded file on failure:", err);
      });
    }
    if (error.code === 11000) {
      return res.status(400).json({
        message: "A product with that name already exists",
      });
    }
    res.status(500).json({
      message: "Error creating product",
      error: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const imageFile = req.file;

    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (updateData.price) {
      const parsedPrice = Number(updateData.price);
      if (isNaN(parsedPrice))
        return res
          .status(400)
          .json({ message: "Price must be a valid number" });
      updateData.price = parsedPrice;
    }
    if (updateData.stock) {
      console.log("Update stock: ", updateData.stock);
      const parsedStock = Number(updateData.stock);
      console.log("Parsed stock: ", parsedStock);
      if (isNaN(parsedStock))
        return res
          .status(400)
          .json({ message: "Stock must be a valid number" });
      updateData.stock = parsedStock;
    }
    if (updateData.minPurchase) {
      const parsedMinPurchase = Number(updateData.minPurchase);
      if (isNaN(parsedMinPurchase))
        return res
          .status(400)
          .json({ message: "Minimum purchase must be a valid number" });
      updateData.minPurchase = parsedMinPurchase;
    }
    if (updateData.description && !Array.isArray(updateData.description)) {
      updateData.description = [updateData.description];
    }

    // handle image
    if (!req.file) {
      console.log("No file uploaded.");
      // Misal kamu mau tetap pakai gambar lama, atau kasih error
    } else {
      const baseUrl = `${req.protocol}://${req.get("host")}`;
      const imagePath = `${baseUrl}/uploads/${imageFile.filename}`;
      updateData.image = imagePath;
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedProduct) {
      return res
        .status(404)
        .json({ message: "Product not found after update attempt" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Product update error:", error);
    if (req.file) {
      fs.unlink(req.file.path, (err) => {
        if (err)
          console.error(
            "Error deleting newly uploaded file on update failure:",
            err
          );
      });
    }
    res.status(500).json({ error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const imagePath = product.image;

    await Product.findByIdAndDelete(id);

    if (imagePath) {
      const fullPath = path.join(__dirname, "..", imagePath);
      fs.unlink(fullPath, (err) => {
        if (err) console.error("Error deleting product image file:", err);
        else console.log(`Deleted product image: ${fullPath}`);
      });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Product deletion error:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getProducts,
  getProductByName,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
