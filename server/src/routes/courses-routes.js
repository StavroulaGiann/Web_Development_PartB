// Create a new Express router instance
const router = require("express").Router();

// Import controller functions responsible for course-related operations
const { getCourses, getCourseByKey } = require("../controllers/courses-controller");


// GET /
// Returns a list of courses (optionally with filters or pagination)
router.get("/", getCourses);

// GET /:key
// Returns a single course identified by its unique key
router.get("/:key", getCourseByKey);

// Export the router so it can be mounted in the main application
module.exports = router;
