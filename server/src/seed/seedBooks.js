require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const Book = require("../models/Book");
const books = require("./books.data");

async function seed() {
  try {
    await connectDB(process.env.MONGODB_URI);

    for (const b of books) {
      await Book.updateOne({ id: b.id }, { $set: b }, { upsert: true });
    }

    const count = await Book.countDocuments();
    console.log(`✅ Seed complete. Books in DB: ${count}`);

    await mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error("❌ Seed failed:", err.message);
    try { await mongoose.connection.close(); } catch {}
    process.exit(1);
  }
}

seed();
