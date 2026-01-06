// Import bcrypt for password hashing and secure password verification.
const bcrypt = require("bcryptjs");

// Import the User model, which provides an abstraction layer over the MongoDB "users" collection 
const User = require("../models/User");


// REGISTER

// Controller responsible for user registration.
exports.register = async (req, res, next) => {
  try {
    // Destructure expected fields from the request body.
    const {
      firstName,
      lastName,
      email,
      birthdate,
      password,
      passwordConfirmation,
      background,
      areaOfInterest,
      programmingExperience,
      mainGoal,
      acceptedTerms,
    } = req.body || {};

    // -------- Basic required fields --------
    // Check the presence of core identity fields needed to create an account.
    if (!firstName || !lastName || !email || !birthdate) {
      return res.status(400).json({ message: "Missing required fields." });
    }
     // Check the presence of profile-related fields.
    if (!background || !areaOfInterest || !programmingExperience || !mainGoal) {
      return res.status(400).json({ message: "Please complete your profile selections." });
    }
     // Enforce a minimum password length as a baseline security measure.
    if (!password || String(password).length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters." });
    }
    // Confirm that the password confirmation matches
    if (password !== passwordConfirmation) {
      return res.status(400).json({ message: "Password confirmation does not match." });
    }
     // Require explicit acceptance of terms of use
    if (!acceptedTerms) {
      return res.status(400).json({ message: "You must accept the terms of use." });
    }

    // -------- Normalize email --------
    // Normalize the email address to enforce a consistent representation
    const normalizedEmail = String(email).toLowerCase().trim();

    // -------- Duplicate email check --------
    // Perform a pre-check for existing accounts using the same email.
    const exists = await User.findOne({ email: normalizedEmail });
    if (exists) {
      return res.status(409).json({ message: "Email already in use." });
    }

    // -------- Birthdate validation --------
    // Check that birthdate is parseable as a real date.
    const birth = new Date(birthdate);
    if (Number.isNaN(birth.getTime())) {
      return res.status(400).json({ message: "Invalid birthdate." });
    }

    // -------- Age check (16+) --------
    // Enforce a minimum age requirement (16+) based on application policy.
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;

    if (age < 16) {
      return res.status(400).json({
        message: "You must be at least 16 years old to register.",
      });
    }

    // -------- HASH PASSWORD  --------
    // Hash the password before persisting it. Storing only the hash for secure credential handling.
    const passwordHash = await bcrypt.hash(String(password), 10);

    // -------- Create user --------
    // Persist the user record with normalized email and a hashed password.
    const user = await User.create({
      firstName,
      lastName,
      email: normalizedEmail,
      birthdate: birth,

       // Store the hashed password only.
      passwordHash,

      // Profile fields collected during registration.
      background,
      areaOfInterest,
      programmingExperience,
      mainGoal,

      // fields required by schema (consistency)
      interest: areaOfInterest,
      experience: programmingExperience,
      goal: mainGoal,

      // Persist the user's explicit consent as a boolean value
      acceptedTerms: Boolean(acceptedTerms),
    });

    // -------- Response (NO password/hash) --------
    // Return only non-sensitive user data to the client.
    return res.status(201).json({
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (err) {
     // Handle duplicate key errors
    if (err && err.code === 11000) {
      return res.status(409).json({ message: "Email already in use." });
    }
     // Surface Mongoose validation errors as a client error (bad request)
    if (err && err.name === "ValidationError") {
      return res.status(400).json({ message: err.message });
    }
    // Forward unexpected runtime errors to centralized error-handling middleware
    next(err);
  }
};


// LOGIN

// Controller responsible for user authentication.
exports.login = async (req, res, next) => {
  try {
    // Extract credentials from request body.
    const { email, password } = req.body || {};

     // Check presence of credentials before querying the database.
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }
    // Normalize the email address to guarantee consistent lookup semantics
    const normalizedEmail = String(email).toLowerCase().trim();

     // Retrieve the user record associated with the provided email.
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // -------- Compare password --------
    // Compare the plaintext password with the stored bcrypt hash.
    const ok = await bcrypt.compare(String(password), user.passwordHash);
    if (!ok) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // -------- Response --------
    // On successful authentication, return non-sensitive user data.
    return res.status(200).json({
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (err) {
     // Forward unexpected errors to centralized error handling.
    next(err);
  }
};
