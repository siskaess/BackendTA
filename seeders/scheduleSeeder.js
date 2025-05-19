const mongoose = require("mongoose");
const Schedule = require("../models/Schedule");
require("dotenv").config();

// Peta user ID ke nama
const userMap = {
  "681034984882cf355c03f8a2": "Ahmad Helmi Fauzi",
  "681034984882cf355c03f8a3": "Ilham Prasetya",
  "681034984882cf355c03f8a4": "Wahyu Nur Febrian",
  "681034984882cf355c03f8a5": "Ardhi Syaputra",
  "681034984882cf355c03f8a6": "Iqbal Maulana",
};

// Helper untuk membuat assignTo
const createAssignTo = (ids) =>
  ids.map((id) => ({
    _id: new mongoose.Types.ObjectId(id),
    name: userMap[id],
  }));
  

const schedules = [
  {
    customer: "clr@gmail.com",
    date: new Date("2025-02-27"),
    time: "10:00",
    transaction: "0000000001",
    assignTo: createAssignTo([
      "681034984882cf355c03f8a2",
      "681034984882cf355c03f8a3",
    ]),
    status: "done",
  },
  {
    customer: "clr@gmail.com",
    date: new Date("2025-02-28"),
    time: "11:00",
    transaction: "0000000002",
    assignTo: createAssignTo([
      "681034984882cf355c03f8a2",
      "681034984882cf355c03f8a3",
    ]),
    status: "done",
  },
  {
    customer: "slamet@gmail.com",
    date: new Date("2025-03-03"),
    time: "10:15",
    transaction: "0000000003",
    assignTo: createAssignTo([
      "681034984882cf355c03f8a2",
      "681034984882cf355c03f8a3",
    ]),
    status: "done",
  },
  {
    customer: "mirrizky@gmail.com",
    date: new Date("2025-03-11"),
    time: "11:00",
    transaction: "0000000004",
    assignTo: createAssignTo([
      "681034984882cf355c03f8a2",
      "681034984882cf355c03f8a4",
    ]),
    status: "done",
  },
  {
    customer: "mirrizky@gmail.com",
    date: new Date("2025-03-11"),
    time: "11:00",
    transaction: "0000000005",
    assignTo: createAssignTo([
      "681034984882cf355c03f8a2",
      "681034984882cf355c03f8a4",
    ]),
    status: "done",
  },
  {
    customer: "mirrizky@gmail.com",
    date: new Date("2025-03-12"),
    time: "10:45",
    transaction: "0000000006",
    assignTo: createAssignTo([
      "681034984882cf355c03f8a2",
      "681034984882cf355c03f8a4",
    ]),
    status: "done",
  },
  {
    customer: "mirrizky@gmail.com",
    date: new Date("2025-03-12"),
    time: "10:45",
    transaction: "0000000007",
    assignTo: createAssignTo([
      "681034984882cf355c03f8a2",
      "681034984882cf355c03f8a4",
    ]),
    status: "done",
  },
  {
    customer: "heti@gmail.com",
    date: new Date("2025-03-13"),
    time: "11:15",
    transaction: "0000000008",
    assignTo: createAssignTo([
      "681034984882cf355c03f8a2",
      "681034984882cf355c03f8a4",
    ]),
    status: "done",
  },
  {
    customer: "heti@gmail.com",
    date: new Date("2025-03-13"),
    time: "11:15",
    transaction: "0000000009",
    assignTo: createAssignTo([
      "681034984882cf355c03f8a2",
      "681034984882cf355c03f8a4",
    ]),
    status: "done",
  },
  {
    customer: "heti@gmail.com",
    date: new Date("2025-03-13"),
    time: "11:15",
    transaction: "0000000010",
    assignTo: createAssignTo([
      "681034984882cf355c03f8a2",
      "681034984882cf355c03f8a4",
    ]),
    status: "done",
  },
  {
    customer: "peppy@gmail.com",
    date: new Date("2025-03-14"),
    time: "14:30",
    transaction: "0000000011",
    assignTo: createAssignTo([
      "681034984882cf355c03f8a5",
      "681034984882cf355c03f8a3",
    ]),
    status: "done",
  },
  {
    customer: "santi@gmail.com",
    date: new Date("2025-03-14"),
    time: "14:00",
    transaction: "0000000012",
    assignTo: createAssignTo([
      "681034984882cf355c03f8a5",
      "681034984882cf355c03f8a6",
    ]),
    status: "done",
  },
  {
    customer: "santi@gmail.com",
    date: new Date("2025-03-14"),
    time: "14:00",
    transaction: "0000000013",
    assignTo: createAssignTo([
      "681034984882cf355c03f8a5",
      "681034984882cf355c03f8a6",
    ]),
    status: "done",
  },
  {
    customer: "christine@gmail.com",
    date: new Date("2025-03-24"),
    time: "14:00",
    transaction: "0000000014",
    assignTo: createAssignTo([
      "681034984882cf355c03f8a2",
      "681034984882cf355c03f8a4",
    ]),
    status: "done",
  },
];

const seedSchedule = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL_DEV_TEST);
    await Schedule.deleteMany({});
    const createdSchedules = await Schedule.insertMany(schedules);
    console.log("Schedules seeded successfully:", createdSchedules);
  } catch (error) {
    console.error("Error seeding schedules:", error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
  }
};

seedSchedule();
