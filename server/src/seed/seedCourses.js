// Load environment variables from .env into process.env
require("dotenv").config();

// Import mongoose to manage the MongoDB connection lifecycle
const mongoose = require("mongoose");

// Import custom database connection helper
const connectDB = require("../config/db");

// Import the Course Mongoose model. Defines the schema and collection for courses
const Course = require("../models/Course");

// Import seed data 
const courses = require("./courses.data");


//Seed script for Courses collection
async function seed() {
  try {
    // Establish MongoDB connection using the URI from environment variables
    await connectDB(process.env.MONGODB_URI);

    // UPSERT logic: updateOne + upsert:true ensures idempotent seeding
    for (const c of courses) {
      await Course.updateOne(
        { id: c.id },   // Match document by stable business identifier
        { $set: c },    // Replace fields with latest seed data
        { upsert: true } // Insert if no matching document is found
      );
    }

    // Count how many course documents exist after seeding
    const count = await Course.countDocuments();
    console.log(` Seed complete. Courses in DB: ${count}`);

    // Close the MongoDB connection
    await mongoose.connection.close();

    // Exit process with success code
    process.exit(0);
  } catch (err) {
    // Log a clean error message 
    console.error(" Seed failed:", err.message);

    // Attempt to close the database connection if it was opened
    try {
      await mongoose.connection.close();
    } catch {
      // Ignore errors while closing the connection
    }

    // Exit process with error code
    process.exit(1);
  }
}

// Execute the seed script
seed();
