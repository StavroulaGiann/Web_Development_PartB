// server/src/models/User.js
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true, minlength: 2, maxlength: 50 },
    lastName: { type: String, required: true, trim: true, minlength: 2, maxlength: 50 },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      maxlength: 254,
    },

    birthdate: { type: Date, required: true },

    // IMPORTANT: hashed password only
    passwordHash: { type: String, required: true },

    // profile
    background: { type: String, required: true, trim: true, maxlength: 120 },
    interest: { type: String, required: true, trim: true, maxlength: 120 },
    experience: { type: String, required: true, trim: true, maxlength: 120 },
    goal: { type: String, required: true, trim: true, maxlength: 120 },

    acceptedTerms: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

// Helpful indexes
UserSchema.index({ email: 1 }, { unique: true });

module.exports = mongoose.model("User", UserSchema);
