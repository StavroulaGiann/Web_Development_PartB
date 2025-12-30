const bcrypt = require("bcryptjs");
const User = require("../models/User");

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
    } = req.body;

    // basic checks (ώστε να μην σκάει mongoose με 500)
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

    // -------- Age check (16+) --------
const birth = new Date(birthdate);
const today = new Date();

let age = today.getFullYear() - birth.getFullYear();
const m = today.getMonth() - birth.getMonth();

if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
  age--;
}

if (age < 16) {
  return res.status(400).json({
    message: "You must be at least 16 years old to register."
  });
}


    const passwordHash = await bcrypt.hash(String(password), 10);

const user = await User.create({
  firstName,
  lastName,
  email: String(email).toLowerCase().trim(),
  birthdate: new Date(birthdate),

  passwordHash,

  // κράτα τα "νέα" σου πεδία (αν τα θες)
  background,
  areaOfInterest,
  programmingExperience,
  mainGoal,

  // ✅ γράψε ΚΑΙ αυτά που απαιτεί το schema
  interest: areaOfInterest,
  experience: programmingExperience,
  goal: mainGoal,

  acceptedTerms: true,
});


    // μην στείλεις passwordHash πίσω
    res.status(201).json({
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (err) {
    // duplicate email nicer message
    if (err && err.code === 11000) {
      return res.status(409).json({ message: "Email already in use." });
    }
    // mongoose validation nicer message
    if (err && err.name === "ValidationError") {
      return res.status(400).json({ message: err.message });
    }
    next(err);
  }
};
