const mongoose = require("mongoose");
const Book = require("../models/Books");

// GET /api/books
async function getBooks(req, res, next) {
  try {
    const books = await Book.find({}).sort({ createdAt: -1 });
    res.json(books);
  } catch (err) {
    next(err);
  }
}

// GET /api/books/:key  (key = mongo _id OR your custom id)
async function getBookByKey(req, res, next) {
  try {
    const { key } = req.params;

    const or = [{ id: key }];

    if (mongoose.Types.ObjectId.isValid(key)) {
      or.push({ _id: key });
    }

    const book = await Book.findOne({ $or: or });

    if (!book) return res.status(404).json({ message: "Book not found" });

    res.json(book);
  } catch (err) {
    next(err);
  }
}

module.exports = { getBooks, getBookByKey };
