const Schedule = require("../models/Schedule");
const User = require("../models/User");
const Transaction = require("../models/Transaction");

const getSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.find();

    const populatedSchedules = await Promise.all(
      schedules.map(async (schedule) => {
        const user = await User.findOne({ email: schedule.customer });
        return {
          ...schedule.toObject(), // Convert Mongoose document to plain object
          customerName: user ? user.name : "N/A", // Add customerName field
        };
      })
    );

    res.status(200).json(populatedSchedules);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getScheduleByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    const schedules = await Schedule.find({ status });
    res.status(200).json(schedules);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getScheduleByTransaction = async (req, res) => {
  try {
    const { transactionId } = req.params;
    const schedules = await Schedule.find({ transaction: transactionId });
    res.status(200).json(schedules);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getScheduleByWorker = async (req, res) => {
  try {
    const { email } = req.params;
    const { status } = req.query;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Worker not found" });
    }

    // Correctly query for schedules where the user's _id is in the assignTo array
    const queryConditions = { "assignTo._id": user._id };

    const schedules = await Schedule.find(queryConditions);

    if (status) {
      const filteredSchedules = schedules.filter(
        (schedule) => schedule.status === status
      );
      return res.status(200).json(filteredSchedules);
    }
    return res.status(200).json(schedules);
  } catch (error) {
    console.error("Error in getScheduleByWorker:", error); // Log the actual error on the server
    res.status(500).json({ error: error.message });
  }
};

const getScheduleById = async (req, res) => {
  try {
    const { id } = req.params;
    const schedule = await Schedule.findById(id);
    if (!schedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }

    const locations = await Transaction.findOne({
      transactionId: schedule.transaction,
    });

    if (!locations) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    const sch = schedule.toObject();
    sch.location = locations.location;
    console.log(sch);
    res.status(200).json(sch);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const confirmSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    const schedule = await Schedule.findById(id);
    if (!schedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }
    schedule.status = "done";
    await schedule.save();
    res.status(200).json({ message: "Schedule confirmed" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createSchedule = async (req, res) => {
  try {
    const { customer, date, time, transaction, assignTo, status } = req.body;
    const customerEmail = await User.findOne({ email: customer });
    const schedule = new Schedule({
      customer: customerEmail.email,
      date,
      time,
      transaction,
      assignTo,
      status,
    });
    await schedule.save();
    res.status(201).json(schedule);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    const schedule = await Schedule.findById(id);
    if (!schedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }
    schedule.customer = req.body.customer || schedule.customer;
    schedule.date = req.body.date || schedule.date;
    schedule.time = req.body.time || schedule.time;
    schedule.transaction = req.body.transaction || schedule.transaction;
    schedule.assignTo = req.body.assignTo || schedule.assignTo;
    schedule.status = req.body.status || schedule.status;
    await schedule.save();
    res.status(200).json(schedule);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createReport = async (req, res) => {
  try {
    const { scheduleId } = req.body;
    const schedule = await Schedule.findById(scheduleId);
    if (!schedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }

    if (req.file) {
      const baseUrl = `${req.protocol}://${req.get("host")}`;
      const profileImageUrl = `${baseUrl}/uploads/${req.file.filename}`;
      schedule.report = profileImageUrl;
    }

    schedule.status = "done";
    if (req.body.additionalInfo) {
      schedule.additionalInfo = req.body.additionalInfo;
    }
    await schedule.save();
    res.status(200).json(schedule);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getSchedules,
  getScheduleByStatus,
  getScheduleByWorker,
  getScheduleByTransaction,
  getScheduleById,
  confirmSchedule,
  createSchedule,
  updateSchedule,
  createReport,
};
