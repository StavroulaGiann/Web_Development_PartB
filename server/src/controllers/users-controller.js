// Import the User model to read and update user data in the database
const User = require("../models/User");


// GET /api/users/:id

// Returns user information by user id, the password (hash) is excluded from the response.
exports.getUserById = async (req, res, next) => {
  try {
    // Find the user by id and exclude the passwordHash field
    const user = await User.findById(req.params.id).select("-passwordHash");

    // If the user does not exist, return 404
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return the user data
    res.json(user);
  } catch (err) {
    // Pass errors to the global error handler
    next(err);
  }
};


// PUT /api/users/:id

// Updates user profile information, password updates are not allowed through this endpoint.
exports.updateUser = async (req, res, next) => {
  try {
    // Read updated fields from request body
    const updates = req.body;

    // Prevent password changes through this route
    delete updates.password;
    delete updates.passwordHash;

    // Update the user and return the updated document, runValidators ensures schema validation is applied
    const user = await User.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    ).select("-passwordHash");

    // If the user does not exist, return 404
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return the updated user data
    res.json(user);
  } catch (err) {
    // Pass errors to the global error handler
    next(err);
  }
};
