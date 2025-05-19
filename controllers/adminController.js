const User = require("../models/User");
const Product = require("../models/Product");
const Transaction = require("../models/Transaction");

async function getAllUsers(req, res) {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving users" });
  }
}

async function getEmployees(req, res) {
  try {
    const employees = await User.find({ role: "pl" });
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving employees" });
  }
}

async function getCustomers(req, res) {
  try {
    const customers = await User.find({ role: "cs" });
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving customers" });
  }
}

async function getAllRequests(req, res) {
  try {
    const requests = await Transaction.find({ status: "pending" });
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving requests" });
  }
}

async function getAllProducts(req, res) {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving products" });
  }
}

async function getAllSales(req, res) {
  try {
    const sales = await Transaction.find({ status: "done" });
    res.status(200).json(sales);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving sales" });
  }
}

async function updateUser(req, res) {
  try {
    const { email } = req.params; // Get email from URL parameter
    const { name, password, address, kode_pos, role } = req.body; // Get updated fields from request body

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found with email: " + email });
    }

    // Update fields if they are provided in the request body
    if (name) user.name = name;
    if (address) user.address = address;
    if (kode_pos) user.kode_pos = kode_pos;
    if (role) user.role = role;

    // Only update the password if a new one is provided
    if (password) {
      // Password will be hashed by the pre-save hook in the User model
      user.password = password;
    }

    // Save the updated user document. This will trigger the pre-save hook for password hashing.
    const updatedUser = await user.save();

    // Exclude password from the returned user object
    const userResponse = updatedUser.toObject();
    delete userResponse.password;

    res.status(200).json(userResponse);
  } catch (error) {
    console.error("Error updating user:", error);
    // Handle potential validation errors
    if (error.name === "ValidationError") {
      return res
        .status(400)
        .json({ message: "Validation Error", errors: error.errors });
    }
    res.status(500).json({
      message: "Error updating user",
      error: error.message,
    });
  }
}

async function deleteUser(req, res) {
  try {
    const { email } = req.params;
    await User.findOneAndDelete({ email });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user" });
  }
}

async function createProduct(req, res) {
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
      image,
    } = req.body;
    const product = await Product.create({
      name,
      type,
      condition,
      minPurchase,
      brand,
      stock,
      price,
      description,
      image,
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error creating product" });
  }
}

module.exports = {
  getAllUsers,
  getEmployees,
  getCustomers,
  getAllRequests,
  getAllProducts,
  getAllSales,
  updateUser, // Ensure updateUser is exported
  deleteUser,
  createProduct,
};
