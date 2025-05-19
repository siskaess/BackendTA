const User = require("../models/User");
const Transaction = require("../models/Transaction");
const bcrypt = require("bcryptjs"); // Import bcrypt at the top
const path = require("path"); // Import path for handling file paths
const fs = require("fs"); // Import fs for potential file deletion (optional)
const mongoose = require("mongoose"); // Import mongoose for ObjectId validation

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      id: user._id,
      email: user.email,
      name: user.name,
      address: user.address,
      kode_pos: user.kode_pos,
      role: user.role,
      rating: user.rating,
      profileImage: user.profileImage,
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ error: "Failed to fetch profile" });
  }
};

const editProfile = async (req, res) => {
  try {
    console.log("Edit Profile Request Body:", req.body);
    console.log("Edit Profile Request File:", req.file);

    const { name, password, address, kode_pos, profileImage } = req.body;
    const userId = req.user._id;

    // 1. Ambil user sebelum diupdate
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      throw new Error("User not found");
    }

    // 2. Simpan nama lama untuk pencarian transaksi
    const oldName = existingUser.name;

    if (!userId) {
      return res.status(401).json({ error: "Not authorized" });
    }

    const currentUser = await User.findById(userId);
    if (!currentUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const updateFields = {};
    if (name) updateFields.name = name;
    if (address) updateFields.address = address;
    if (kode_pos) updateFields.kode_pos = kode_pos;
    if (profileImage) updateFields.profileImage = profileImage;

    if (password) {
      updateFields.password = await bcrypt.hash(password, 10);
    }

    if (Object.keys(updateFields).length === 0 && !req.file) {
      return res.status(400).json({ error: "No valid fields to update" });
    }

    if (req.file) {
      const baseUrl = `${req.protocol}://${req.get("host")}`;
      const profileImageUrl = `${baseUrl}/uploads/${req.file.filename}`;
      updateFields.profileImage = profileImageUrl;
    }

    // Perform the update
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateFields },
      { new: true, runValidators: true }
    ).select("-password");

    // 4. Update semua transaksi yang punya nama user lama
    if (name) {
      await Transaction.updateMany(
        { user: oldName }, // filter transaksi lama
        { $set: { user: name } } // update nama baru
      );
    }

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found during update" });
    }

    res.json({
      id: updatedUser._id,
      email: updatedUser.email,
      name: updatedUser.name,
      address: updatedUser.address,
      kode_pos: updatedUser.kode_pos,
      role: updatedUser.role,
      rating: updatedUser.rating,
      profileImage: updatedUser.profileImage,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    if (error.name === "ValidationError") {
      return res
        .status(400)
        .json({ error: "Validation failed", details: error.message });
    }
    res
      .status(500)
      .json({ error: "Failed to update profile", details: error.message });
  }
};

const getUserByRole = async (req, res) => {
  try {
    const role = req.params.role;
    if (!["pl", "pk", "cs", "ow"].includes(role)) {
      return res.status(400).json({ error: "Invalid role specified" });
    }
    const users = await User.find({ role }).select("-password");
    res.status(200).json(users);
  } catch (error) {
    console.error(`Error fetching users by role ${req.params.role}:`, error);
    res
      .status(500)
      .json({ error: "Failed to fetch users", details: error.message });
  }
};

const getFieldWorkers = async (req, res) => {
  try {
    const fieldWorkers = await User.find({ role: "pl" }).select("-password");
    res.status(200).json(fieldWorkers);
  } catch (error) {
    console.error("Error fetching field workers:", error);
    res
      .status(500)
      .json({ error: "Failed to fetch field workers", details: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { email, name, password, address, kode_pos, role } = req.body;

    if (!email || !name || !password || !address || !kode_pos) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    if (role && !["pl", "pk", "cs", "ow"].includes(role)) {
      return res.status(400).json({ error: "Invalid role" });
    }

    const existingUser = await User.findOne({
      email: { $regex: new RegExp(`^${email}$`, "i") },
    });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const user = new User({
      email,
      name,
      password,
      address,
      kode_pos,
      role: role || "cs",
    });

    await user.save();

    res.status(201).json({
      id: user._id,
      email: user.email,
      name: user.name,
      address: user.address,
      kode_pos: user.kode_pos,
      role: user.role,
      rating: user.rating,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    if (error.name === "ValidationError") {
      return res
        .status(400)
        .json({ error: "Validation failed", details: error.message });
    }
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ error: "Email already registered (concurrent request)." });
    }
    res.status(500).json({
      error: "Failed to create user",
      details: error.message,
    });
  }
};

const giveRating = async (req, res) => {
  try {
    const { worker_id } = req.params;
    const { transaction_id, user_id, rating_number } = req.body;

    if (
      !mongoose.Types.ObjectId.isValid(worker_id) ||
      !mongoose.Types.ObjectId.isValid(transaction_id) ||
      !mongoose.Types.ObjectId.isValid(user_id)
    ) {
      return res.status(400).json({ message: "Invalid ID format provided." });
    }
    const ratingNum = parseInt(rating_number, 10);
    if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5) {
      return res.status(400).json({
        message: "Invalid rating value. Must be a number between 1 and 5.",
      });
    }

    const user = await User.findById(worker_id);
    if (!user) {
      return res.status(404).json({ message: "Rated user not found" });
    }

    const ratingIndex = user.rating.findIndex(
      (entry) =>
        entry.transaction_id.toString() === transaction_id.toString() &&
        entry.user_id.toString() === user_id.toString()
    );

    if (ratingIndex > -1) {
      user.rating[ratingIndex].rating_number = ratingNum;
    } else {
      user.rating.push({
        transaction_id: transaction_id,
        user_id: user_id,
        rating_number: ratingNum,
      });
    }

    user.markModified("rating");
    await user.save();

    return res.status(200).json({ message: "Rating processed successfully" });
  } catch (error) {
    console.error("Error giving rating:", error);
    return res
      .status(500)
      .json({ error: "Failed to process rating", details: error.message });
  }
};

const getAllComments = async (req, res) => {
  try {
    const transactionsWithComments = await Transaction.find({
      comments: { $exists: true, $ne: null, $ne: "" },
    }).select("comments");

    const comments = transactionsWithComments.map(
      (transaction) => transaction.comments
    );

    res.status(200).json(comments);
  } catch (error) {
    console.error("Error fetching all comments:", error);
    res
      .status(500)
      .json({ error: "Failed to fetch comments", details: error.message });
  }
};

const getDetailRating = async (req, res) => {
  const { transaction_id, worker_id } = req.params;

  if (
    !mongoose.Types.ObjectId.isValid(worker_id) ||
    !mongoose.Types.ObjectId.isValid(transaction_id)
  ) {
    return res.status(400).json({ message: "Invalid ID format provided." });
  }

  try {
    const user = await User.findById(worker_id);
    if (!user) {
      return res.status(200).json({ rating_number: 0 });
    }

    const ratingEntry = user.rating.find(
      (entry) => entry.transaction_id.toString() === transaction_id.toString()
    );

    if (!ratingEntry) {
      return res.status(200).json({ rating_number: 0 });
    }

    return res.status(200).json({ 
      rating_number: ratingEntry.rating_number,
      user_id_rater: ratingEntry.user_id
    });
  } catch (error) {
    console.error("Error fetching detail rating:", error);
    return res.status(500).json({
      message: "Server error fetching rating",
      details: error.message,
    });
  }
};

module.exports = {
  getProfile,
  editProfile,
  getUserByRole,
  getFieldWorkers,
  createUser,
  giveRating,
  getAllComments,
  getDetailRating,
};
