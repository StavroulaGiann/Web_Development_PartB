//Import mongoose mainly to use helper functions, e.g., to validate ObjectId.
const mongoose = require("mongoose");

// Import the Book model, which represents the books collection
const Book = require("../models/Books");

// GET /api/books

// This function returns all books stored in the database. The books are sorted so that the newest ones appear first.
async function getBooks(req, res, next) {
  try {
    // Fetch all books from the database.
    const books = await Book.find({}).sort({ createdAt: -1 });
     // Send the list of books back to the client as JSON.
    res.json(books);
  } catch (err) {
    // If something goes wrong, pass the error to the global error handler.
    next(err);
  }
}

// GET /api/books/:key

// This function returns a single book. The "key" can be either the MongoDB _id or a custom book id.
async function getBookByKey(req, res, next) {
  try {
     // Get the id/key from the URL.
    const { key } = req.params;

    //Try to find the book using a custom "id" field.
    const or = [{ id: key }];

    // If the key looks like a valid MongoDB ObjectId, we also try to find the book by its _id.
    if (mongoose.Types.ObjectId.isValid(key)) {
      or.push({ _id: key });
    }

    // Search for a book that matches either condition.
    const book = await Book.findOne({ $or: or });

    // If no book is found, return a 404 error.
    if (!book) return res.status(404).json({ message: "Book not found" });

    // If a book is found, return it to the client.
    res.json(book);
  } catch (err) {
     // Pass any unexpected error to the global error handler.
    next(err);
  }
}
// Export the functions
module.exports = { getBooks, getBookByKey };
