require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const Course = require("../models/Course");
const courses = require("./courses.data");

async function seed() {
  try {
    await connectDB(process.env.MONGODB_URI);

    // “Upsert” λογική: για κάθε course, αν υπάρχει (id), κάνε update, αλλιώς insert
    for (const c of courses) {
      await Course.updateOne({ id: c.id }, { $set: c }, { upsert: true });
    }

    const count = await Course.countDocuments();
    console.log(`✅ Seed complete. Courses in DB: ${count}`);

    await mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error("❌ Seed failed:", err.message);
    try {
      await mongoose.connection.close();
    } catch {}
    process.exit(1);
  }
}

seed();
