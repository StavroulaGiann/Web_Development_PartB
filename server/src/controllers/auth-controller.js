const bcrypt = require("bcryptjs");
const User = require("../models/User");

// --------------------
// REGISTER
// --------------------
exports.register = async (req, res, next) => {
  try {
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
    if (!firstName || !lastName || !email || !birthdate) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    if (!background || !areaOfInterest || !programmingExperience || !mainGoal) {
      return res.status(400).json({ message: "Please complete your profile selections." });
    }

    if (!password || String(password).length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters." });
    }

    if (password !== passwordConfirmation) {
      return res.status(400).json({ message: "Password confirmation does not match." });
    }

    if (!acceptedTerms) {
      return res.status(400).json({ message: "You must accept the terms of use." });
    }

    // -------- Normalize email --------
    const normalizedEmail = String(email).toLowerCase().trim();

    // -------- Duplicate email check --------
    const exists = await User.findOne({ email: normalizedEmail });
    if (exists) {
      return res.status(409).json({ message: "Email already in use." });
    }

    // -------- Birthdate validation --------
    const birth = new Date(birthdate);
    if (Number.isNaN(birth.getTime())) {
      return res.status(400).json({ message: "Invalid birthdate." });
    }

    // -------- Age check (16+) --------
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;

    if (age < 16) {
      return res.status(400).json({
        message: "You must be at least 16 years old to register.",
      });
    }

    // -------- HASH PASSWORD (HERE!) --------
    const passwordHash = await bcrypt.hash(String(password), 10);

    // -------- Create user --------
    const user = await User.create({
      firstName,
      lastName,
      email: normalizedEmail,
      birthdate: birth,

      passwordHash,

      // profile fields
      background,
      areaOfInterest,
      programmingExperience,
      mainGoal,

      // fields required by schema (consistency)
      interest: areaOfInterest,
      experience: programmingExperience,
      goal: mainGoal,

      acceptedTerms: Boolean(acceptedTerms),
    });

    // -------- Response (NO password/hash) --------
    return res.status(201).json({
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (err) {
    if (err && err.code === 11000) {
      return res.status(409).json({ message: "Email already in use." });
    }
    if (err && err.name === "ValidationError") {
      return res.status(400).json({ message: err.message });
    }
    next(err);
  }
};

// --------------------
// LOGIN
// --------------------
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const normalizedEmail = String(email).toLowerCase().trim();

    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // -------- Compare password --------
    const ok = await bcrypt.compare(String(password), user.passwordHash);
    if (!ok) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // -------- Response --------
    return res.status(200).json({
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (err) {
    next(err);
  }
};
