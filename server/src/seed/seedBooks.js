const mongoose = require("mongoose");
const dotenv = require("dotenv");

const Book = require("../models/Books");
const books = require("./books.data");

dotenv.config();

async function seedBooks() {
  try {
     await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB connected");

    await Book.deleteMany();
    await Book.insertMany(books);

    console.log("✅ Books seeded successfully");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seed books error:", err);
    process.exit(1);
  }
}

seedBooks();
