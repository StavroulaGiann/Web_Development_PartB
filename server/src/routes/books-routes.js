// Create a new Express router instance
const router = require("express").Router();

// Import controller functions responsible for book-related operations
const { getBooks, getBookByKey } = require("../controllers/books-controller");


// GET /
// Returns a list of books
router.get("/", getBooks);


// GET /:key
// Returns a single book identified by its unique key
router.get("/:key", getBookByKey);

// Export the router so it can be mounted in the main application
module.exports = router;
