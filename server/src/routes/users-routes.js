// Create a new Express router instance
const router = require("express").Router();

// Import the User model to interact with the users collection
const User = require("../models/User");


// POST /
// Creates a test user directly in the database. This route is typically used for development or testing purposes.
router.post("/", async (req, res) => {
  // Create a new user with hardcoded test data
  const user = await User.create({
    name: "Test User",
    email: "test@test.com",
  });

  // Return the created user with HTTP 201 (Created)
  res.status(201).json(user);
});

// Export the router so it can be mounted in the main application
module.exports = router;
