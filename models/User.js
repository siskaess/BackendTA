const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  profileImage: { type: String, default: "" },  
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
  kode_pos: { type: String, required: true },
  role: { type: String, enum: ["pl", "pk", "cs", "ow"], default: "cs" },
  rating: [
    {
      transaction_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "transactions",
        required: true,
      },
      user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
      },
      rating_number: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
      },
    },
  ],
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

module.exports = mongoose.model("users", userSchema);
