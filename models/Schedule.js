const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
  customer: { type: String, required: true },
  date: { type: Date, required: false },
  time: { type: String, required: false },
  transaction: { type: String, required: true },
  assignTo: [
    {
      _id: mongoose.Types.ObjectId,
      name: String,
    },
  ],
  status: { type: String, enum: ["pending", "done"], required: true },
  report: {
    type: String,
    required: false,
  },
  additionalInfo: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("schedules", scheduleSchema);
