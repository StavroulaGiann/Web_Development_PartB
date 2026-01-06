// Create a new Express router instance
const router = require("express").Router();

// Import review-related controller functions
const c = require("../controllers/reviews-controller");

// Import request validation middleware
const validateRequest = require("../middleware/validateRequest");


// POST /
// Creates a new review for a course. Validates the request body before delegating to the controller.
router.post(
  "/",
  validateRequest({
    body: {
      userId: { required: true, type: "string", format: "objectId", trim: true },
      courseId: { required: true, type: "string", trim: true }, // course key, not a MongoDB ObjectId
      rating: { required: true, type: "number", coerceNumber: true, min: 1, max: 5 },
      comment: { required: false, type: "string", trim: true, maxLen: 1000 },
    },
  }),
  // Handles the business logic for creating a course review
  c.createReview
);


// GET /course/:courseId
// Returns all reviews associated with a specific course.
router.get(
  "/course/:courseId",
  validateRequest({
    params: {
      courseId: { required: true, type: "string", trim: true }, // course key, not a MongoDB ObjectId
    },
  }),
  // Handles retrieval of reviews for a given course
  c.getCourseReviews
);

// Export the router so it can be mounted in the main application
module.exports = router;
