// server/src/models/User.js
const mongoose = require("mongoose");

// User schema definition
const UserSchema = new mongoose.Schema(
  {
    // User's first name
    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },

    // User's last name
    lastName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },

    // User email (used for login, must be unique)
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      maxlength: 254,
    },

    // User date of birth
    birthdate: {
      type: Date,
      required: true,
    },

    // Store only the hashed password
    passwordHash: {
      type: String,
      required: true,
    },

    // Profile-related fields
    background: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },

    interest: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },

    experience: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },

    goal: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },

    // Whether the user accepted the terms and conditions
    acceptedTerms: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    // Automatically adds createdAt and updatedAt timestamps
    timestamps: true,
  }
);

// Index to enforce unique email addresses
UserSchema.index({ email: 1 }, { unique: true });

// Export User model
module.exports = mongoose.model("User", UserSchema);
