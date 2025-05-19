const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Register User
const registerUser = async (req, res) => {
  // Use address and kode_pos from the request body, remove gender and birthDate
  const { name, email, password, address, kode_pos } = req.body;
  try {
    // Check if all required fields are present
    if (!name || !email || !password || !address || !kode_pos) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    // Create user with the fields defined in the User model
    const user = new User({ name, email, password, address, kode_pos });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    // Add more specific error handling if needed (e.g., duplicate email)
    if (error.code === 11000) {
      // Handle duplicate email error (MongoDB specific code)
      return res.status(400).json({ error: "Email already registered" });
    }
    res.status(400).json({ error: error.message });
  }
};

// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  try {
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    const token = jwt.sign(
      { id: user._id, role: user.role }, // Include role in the token
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Include user details in the response, excluding password
    return res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        address: user.address,
        kode_pos: user.kode_pos,
        role: user.role,
        rating: user.rating,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const logoutUser = async (req, res) => {
  try {
    // For JWT, client-side deletion is enough, but you could add token to a blacklist
    // if you want to invalidate it server-side
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const authenticate = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ error: "Access denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(400).json({ error: "Invalid token" });
  }
};

module.exports = { registerUser, loginUser, logoutUser, authenticate };
