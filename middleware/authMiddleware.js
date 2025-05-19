const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  try {
    console.log("recieved auth header: ", req.headers.authorization);

    let token;

    // Check if authorization header exists and starts with 'Bearer'
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    console.log("token: ", token);
    // Check if token exists
    if (!token) {
      return res
        .status(401)
        .json({ error: "Not authorized, no token provided" });
    }
    console.log("env: ", process.env.JWT_SECRET);
    // Verify token
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        console.log("Error verifying token: ", err);
        return res.status(401).json({ error: "Not authorized, invalid token" });
      }
      console.log("Decoded token: ", decoded);
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({ error: "User not found" });
      }

      next();
    }); // Verify tidak jalan
  } catch (error) {
    res.status(401).json({ error: "Not authorized, invalid token" });
  }
};

module.exports = { protect };
