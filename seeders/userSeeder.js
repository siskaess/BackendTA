const mongoose = require("mongoose");
const User = require("../models/User");
require("dotenv").config();

const users = [
  {
    _id: new mongoose.Types.ObjectId("681034984882cf355c03f89c"),
    email: "nayla@gmail.com",
    name: "Chelsea Nayla",
    password: "$2a$12$6guVAnS.FLHybCdWjBkR6.x45oww7AVaBtcsXpnWg0CiNWXPCIPau",
    address: "Dukuh Kupang Timur No. 2",
    kode_pos: "60225",
    role: "pk",
    rating: [],
  },
  {
    _id: new mongoose.Types.ObjectId("681034984882cf355c03f89d"),
    email: "izmi@gmail.com",
    name: "Izmi Amaliya",
    password: "$2a$12$6guVAnS.FLHybCdWjBkR6.x45oww7AVaBtcsXpnWg0CiNWXPCIPau",
    address: "Simo Hilir No. 2",
    kode_pos: "60224",
    role: "pk",
    rating: [],
  },
  {
    _id: new mongoose.Types.ObjectId("681034984882cf355c03f89e"),
    email: "lidiya@gmail.com",
    name: "Maulidiyah Zah'ra Lidinillah",
    password: "$2a$12$6guVAnS.FLHybCdWjBkR6.x45oww7AVaBtcsXpnWg0CiNWXPCIPau",
    address: "Manyar Kertoadi No. 2",
    kode_pos: "60221",
    role: "pk",
    rating: [],
  },
  {
    _id: new mongoose.Types.ObjectId("681034984882cf355c03f89f"),
    email: "nabila@gmail.com",
    name: "Nabila Zaltasa Putri Saleha",
    password: "$2a$12$6guVAnS.FLHybCdWjBkR6.x45oww7AVaBtcsXpnWg0CiNWXPCIPau",
    address: "Rajawali No. 2",  
    kode_pos: "60226",
    role: "pk",
    rating: [],
  },
  {
    _id: new mongoose.Types.ObjectId("681034984882cf355c03f8a0"),
    email: "dwi@gmail.com",
    name: "Dwi Ayu Lestari",
    password: "$2a$12$6guVAnS.FLHybCdWjBkR6.x45oww7AVaBtcsXpnWg0CiNWXPCIPau",
    address: "Barata Jaya No. 12",
    kode_pos: "60224",
    role: "pk",
    rating: [],
  },
  {
    _id: new mongoose.Types.ObjectId("681034984882cf355c03f8a1"),
    email: "anes@gmail.com",
    name: "Annestsufy Rosearty",
    password: "$2a$12$6guVAnS.FLHybCdWjBkR6.x45oww7AVaBtcsXpnWg0CiNWXPCIPau",
    address: "Kertajaya No. 20",
    kode_pos: "22222",
    role: "pk",
    rating: [],
  },
  {
    _id: new mongoose.Types.ObjectId("681034984882cf355c03f8a2"),
    email: "ahmad@gmail.com",
    name: "Ahmad Helmi Fauzi",
    password: "$2a$12$6guVAnS.FLHybCdWjBkR6.x45oww7AVaBtcsXpnWg0CiNWXPCIPau",
    address: "Wonokromo No. 21",
    kode_pos: "60228",
    role: "pl",
    rating: [],
  },
  {
    _id: new mongoose.Types.ObjectId("681034984882cf355c03f8a3"),
    email: "ilham@gmail.com",
    name: "Ilham Prasetya",
    password: "$2a$12$6guVAnS.FLHybCdWjBkR6.x45oww7AVaBtcsXpnWg0CiNWXPCIPau",
    address: "Gubeng Kertjaya No. 21",
    kode_pos: "60228",
    role: "pl",
    rating: [],
  },
  {
    _id: new mongoose.Types.ObjectId("681034984882cf355c03f8a4"),
    email: "wahyu@gmail.com",
    name: "Wahyu Nur Febrian",
    password: "$2a$12$6guVAnS.FLHybCdWjBkR6.x45oww7AVaBtcsXpnWg0CiNWXPCIPau",
    address: "Sidotopo No. 18",
    kode_pos: "60227",
    role: "pl",
    rating: [],
  },
  {
    _id: new mongoose.Types.ObjectId("681034984882cf355c03f8a5"),
    email: "ardhi@gmail.com",
    name: "Ardhi Syaputra",
    password: "$2a$12$6guVAnS.FLHybCdWjBkR6.x45oww7AVaBtcsXpnWg0CiNWXPCIPau",
    address: "Simokerto No. 14",
    kode_pos: "60225",
    role: "pl",
    rating: [],
  },
  {
    _id: new mongoose.Types.ObjectId("681034984882cf355c03f8a6"),
    email: "iqbal@gmail.com",
    name: "Iqbal Maulana",
    password: "$2a$12$6guVAnS.FLHybCdWjBkR6.x45oww7AVaBtcsXpnWg0CiNWXPCIPau",
    address: "Kembang Jepun No. 10",
    kode_pos: "60271",
    role: "pl",
    rating: [],
  },
  {
    _id: new mongoose.Types.ObjectId("681034984882cf355c03f8a7"),
    email: "clr@gmail.com",
    name: "CITRUS LEE RESTAURANT",
    password: "$2a$12$6guVAnS.FLHybCdWjBkR6.x45oww7AVaBtcsXpnWg0CiNWXPCIPau",
    address: "Jl. Kutai No. 12",
    kode_pos: "60237",
    role: "cs",
    rating: [],
  },
  {
    _id: new mongoose.Types.ObjectId("681034984882cf355c03f8a8"),
    email: "slamet@gmail.com",
    name: "SLAMET SOEBANDI",
    password: "$2a$12$6guVAnS.FLHybCdWjBkR6.x45oww7AVaBtcsXpnWg0CiNWXPCIPau",
    address: "Apartemen Laguna Blok A-21 No. 72",
    kode_pos: "60235",
    role: "cs",
    rating: [],
  },
  {
    _id: new mongoose.Types.ObjectId("681034984882cf355c03f8a9"),
    email: "mirrizky@gmail.com",
    name: "MIRRIZKY HUSNA AMALIA",
    password: "$2a$12$6guVAnS.FLHybCdWjBkR6.x45oww7AVaBtcsXpnWg0CiNWXPCIPau",
    address: "Jl. Raya Tenggilis No. 25",
    kode_pos: "60292",
    role: "cs",
    rating: [],
  },
  {
    _id: new mongoose.Types.ObjectId("681034984882cf355c03f8aa"),
    email: "heti@gmail.com",
    name: "HETI",
    password: "$2a$12$6guVAnS.FLHybCdWjBkR6.x45oww7AVaBtcsXpnWg0CiNWXPCIPau",
    address: "Jl. Bendul Merisi Utara V No. 16",
    kode_pos: "60239",
    role: "cs",
    rating: [],
  },
  {
    _id: new mongoose.Types.ObjectId("681034984882cf355c03f8ab"),
    email: "peppy@gmail.com",
    name: "PEPPY BUDIMAN",
    password: "$2a$12$6guVAnS.FLHybCdWjBkR6.x45oww7AVaBtcsXpnWg0CiNWXPCIPau",
    address: "Perumahan The Osso, Cluster The Trust D55",
    kode_pos: "60191",
    role: "cs",
    rating: [],
  },
  {
    _id: new mongoose.Types.ObjectId("681034984882cf355c03f8ac"),
    email: "santi@gmail.com",
    name: "SANTI",
    password: "$2a$12$6guVAnS.FLHybCdWjBkR6.x45oww7AVaBtcsXpnWg0CiNWXPCIPau",
    address: "Jl. Raya Semolowaru Ruko Araya 2 Blok J1 No. 11",
    kode_pos: "60119",
    role: "cs",
    rating: [],
  },
  {
    _id: new mongoose.Types.ObjectId("681034984882cf355c03f8ad"),
    email: "christine@gmail.com",
    name: "CHRISTINE NATALIA",
    password: "$2a$12$6guVAnS.FLHybCdWjBkR6.x45oww7AVaBtcsXpnWg0CiNWXPCIPau",
    address: "International Village 2 Blok H11 No. 3",
    kode_pos: "22222",
    role: "cs",
    rating: [],
  },
  {
    _id: new mongoose.Types.ObjectId("681034984882cf355c03f8ae"),
    email: "wilson@gmail.com",
    name: "Wilson Gondokusumo",
    password: "$2a$12$6guVAnS.FLHybCdWjBkR6.x45oww7AVaBtcsXpnWg0CiNWXPCIPau",
    address: "International Village 2 Blok H11 No. 3",
    kode_pos: "60117",
    role: "ow",
    rating: [],
  },
];

const seedUsers = async () => {
  try {
    // Changed from MONGODB_URL_DEV to match your .env file
    console.log(process.env);

    await mongoose.connect(process.env.MONGODB_URL_DEV_TEST);

    await User.deleteMany({});
    const createdUsers = await User.insertMany(users);
    console.log("Users seeded successfully:", createdUsers);
  } catch (error) {
    console.error("Error seeding users:", error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
  }
};

seedUsers();
