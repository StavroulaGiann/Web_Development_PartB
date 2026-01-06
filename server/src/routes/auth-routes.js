// Create a new Express router instance
const router = require("express").Router();

// Import authentication controller (register, login logic)
const authController = require("../controllers/auth-controller");

// Import request validation middleware
const validateRequest = require("../middleware/validateRequest");


// POST /register

// Handles user registration.
router.post(
  "/register",

  // Before reaching the controller, the request body is validated
  validateRequest({
    body: {
      // firstName, lastName: required strings with length limits
      firstName: { required: true, type: "string", trim: true, minLen: 2, maxLen: 50 },
      lastName: { required: true, type: "string", trim: true, minLen: 2, maxLen: 50 },
      // email: required, must be a valid email, trimmed and lowercased
      email: { required: true, type: "string", format: "email", trim: true, lowercase: true },
       // password: required string with minimum length
      password: { required: true, type: "string", minLen: 6, maxLen: 200 },
    },
  }),
  // Controller function that handles user registration logic
  authController.register
);


// POST /login

// Handles user login.
router.post(
  "/login",
  // Validates the request body before calling the controller:
  validateRequest({
    body: {
      //email: required, valid email format
      email: { required: true, type: "string", format: "email", trim: true, lowercase: true },
      // password: required string
      password: { required: true, type: "string", minLen: 6, maxLen: 200 },
    },
  }),
  // Controller function that handles user authentication (login)
  authController.login
);

// Export the router so it can be mounted in the main app
module.exports = router;
