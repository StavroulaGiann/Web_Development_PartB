// server/src/models/User.js
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },

    email: { type: String, required: true, unique: true, lowercase: true, trim: true },

    birthdate: { type: Date, required: true },

    // IMPORTANT: hashed password only
    passwordHash: { type: String, required: true },

    // profile
   background: { type: String, required: true },
interest: { type: String, required: true },
experience: { type: String, required: true },
goal: { type: String, required: true },

    acceptedTerms: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
