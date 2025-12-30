const User = require("../models/User");

/**
 * GET /api/users/:id
 * επιστρέφει στοιχεία χρήστη (χωρίς password)
 */
exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-passwordHash");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    next(err);
  }
};

/**
 * PUT /api/users/:id
 * update profile
 */
exports.updateUser = async (req, res, next) => {
  try {
    const updates = req.body;

    // ΔΕΝ επιτρέπουμε αλλαγή password εδώ
    delete updates.password;
    delete updates.passwordHash;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    ).select("-passwordHash");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    next(err);
  }
};
