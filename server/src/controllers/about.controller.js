// Import the TeamMember model, which represents the team collection in the MongoDB
const TeamMember = require("../models/TeamMember");

// Controller function responsible for handling the "About" endpoint.
exports.getAbout = async (req, res, next) => {
  try {
    //This text describes the purpose and scope of DevAcademy and is included in the API response.
    const mission =
      "DevAcademy is an educational platform that brings together courses, books, and hands-on practice to help developers build real-world skills";

    // Fetch all team members from the database and sort them by the 'order' field in ascending order.
    const team = await TeamMember.find().sort({ order: 1 });

    // Send the text and team data to the client in JSON format
    res.json({ mission, team });
  } catch (err) {
    // Forward any errors to the global error-handling middleware
    next(err);
  }
};
