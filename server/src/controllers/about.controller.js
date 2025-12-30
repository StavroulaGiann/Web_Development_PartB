const TeamMember = require("../models/TeamMember");

exports.getAbout = async (req, res, next) => {
  try {
    const mission =
      "Το DevAcademy είναι μια εκπαιδευτική πλατφόρμα που συνδυάζει μαθήματα, βιβλία και πρακτική εξάσκηση.";

    const team = await TeamMember.find().sort({ order: 1 });

    res.json({ mission, team });
  } catch (err) {
    next(err);
  }
};
