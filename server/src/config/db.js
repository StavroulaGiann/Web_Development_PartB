// Import the mongoose library, which acts as an ODM tool for connecting and interacting with a MongoDB database from a Node.js application.
const mongoose = require("mongoose");

// Asynchronous function responsible for establishing a connection to MongoDB.
// It receives the database connection URI as a parameter
async function connectDB(uri) {
  try {

   // Establishes an asynchronous connection to MongoDB using mongoose.
    await mongoose.connect(uri);

    // print a confirmation message indicating that the connection was successful.
    console.log("MongoDB connected");
  } catch (err) {
    // In case of a connection failure, print the error message
    console.error("Mongo connection error:", err.message);

    // Terminate the Node.js process with a non-zero exit code
    process.exit(1);
  }
}

// Export the connectDB function
module.exports = connectDB;
