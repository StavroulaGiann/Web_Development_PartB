// Import the Enrollment model, which stores user–course registrations
const Enrollment = require("../models/Enrollment");

// Import User and Course models to verify that they exist
const User = require("../models/User");
const Course = require("../models/Course");

// Import mongoose to check if an id is a valid MongoDB ObjectId
const mongoose = require("mongoose");

// POST /api/enrollments

// Registers a user to a specific course
exports.createEnrollment = async (req, res, next) => {
  try {
    // Read userId and courseId from the request body
    const { userId, courseId } = req.body || {};

    // Both values are required
    if (!userId || !courseId) {
      return res.status(400).json({ message: "userId and courseId are required." });
    }

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found." });

    // Find the course: by MongoDB _id if courseId is a valid ObjectId, otherwise by custom course id
    const course =
    mongoose.Types.ObjectId.isValid(courseId)
      ? await Course.findById(courseId)
      : await Course.findOne({ id: courseId });

  // If course does not exist, return error
  if (!course) return res.status(404).json({ message: "Course not found." });

  // Create the enrollment (user-course relation)
  const enrollment = await Enrollment.create({ userId, courseId: course._id });

  // Return the created enrollment
  return res.status(201).json({ enrollment });
    } catch (err) {
    // If a duplicate key error occurs, the user is already enrolled
    if (err && err.code === 11000) {
      return res.status(409).json({ message: "User already enrolled in this course." });
    }
    // Pass unexpected errors to the global error handler
    next(err);
  }
};

// GET /api/enrollments?userId=

// Returns all enrollments for a specific user
exports.getEnrollmentsByUser = async (req, res, next) => {
  try {
    // Read userId from query parameters
    const userId = req.query.userId;

    // userId is required
    if (!userId) return res.status(400).json({ message: "userId query param is required." });

    // Find all enrollments for the user
    // populate("courseId") replaces the courseId with full course data
    const enrollments = await Enrollment.find({ userId }).populate("courseId");

    // Return the enrollments
    return res.status(200).json({ enrollments });
  } catch (err) {
    // Pass errors to the global error handler
    next(err);
  }
};
