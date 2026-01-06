// Load Mongoose (MongoDB ODM) so we can connect to the database and run queries.
const mongoose = require("mongoose");

// Load dotenv to read environment variables from a .env file 
const dotenv = require("dotenv");

// Import the Book model (Mongoose schema) which defines how books are stored in MongoDB.
const Book = require("../models/Books");

// Import the seed data (an array of book objects).
const books = require("./books.data");

// Read .env file and populate process.env
dotenv.config();


// * Seeds the Books collection:
async function seedBooks() {
  try {
    // Connect to MongoDB using the connection string from environment variables.
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(" MongoDB connected");

    // Remove ALL existing documents from the Books collection, so we start with a clean state every time we seed.
    await Book.deleteMany();

    // Insert the seed data in bulk (fast insertion of multiple documents).
    await Book.insertMany(books);

    console.log(" Books seeded successfully");

    // Exit with success code (0) after finishing.
    process.exit(0);
  } catch (err) {
    // Print any error 
    console.error(" Seed books error:", err);

    // Exit with error code (1) so terminal knows the script failed.
    process.exit(1);
  }
}

// Run the seeding function immediately when this file is executed 
seedBooks();
