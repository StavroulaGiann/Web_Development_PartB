// Create a new Express router instance
const router = require("express").Router();

// Import enrollment-related controller functions
const c = require("../controllers/enrollments-controller");

// Import request validation middleware
const validateRequest = require("../middleware/validateRequest");


// POST /
// Creates a new enrollment for a user in a specific course. Validates the request body before delegating to the controller.
router.post(
  "/",
  validateRequest({
    body: {
      userId: { required: true, type: "string", format: "objectId", trim: true },
      courseId: { required: true, type: "string", trim: true }, // course key, not a MongoDB ObjectId
    },
  }),
  // Handles the business logic for creating an enrollment
  c.createEnrollment
);


// GET /
// Returns enrollments for a specific user
router.get(
  "/",
  // Handles retrieval of user enrollments
  c.getEnrollmentsByUser
);

// Export the router so it can be mounted in the main application
module.exports = router;
