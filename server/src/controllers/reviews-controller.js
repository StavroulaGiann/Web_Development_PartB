// Import the Review model, which stores user reviews for courses
const Review = require("../models/Review");

// Import User and Course models to check that they exist
const User = require("../models/User");
const Course = require("../models/Course");

// Import mongoose to validate MongoDB ObjectIds
const mongoose = require("mongoose");

// POST /api/reviews

// Creates a new review for a course
exports.createReview = async (req, res, next) => {
  try {
    // Read review data from the request body
    const { userId, courseId, rating, comment } = req.body || {};

     // userId, courseId and rating are required
    if (!userId || !courseId || rating == null) {
      return res.status(400).json({ message: "userId, courseId and rating are required." });
    }

    // Convert rating to a number and check that it is between 1 and 5
    const r = Number(rating);
    if (!Number.isFinite(r) || r < 1 || r > 5) {
      return res.status(400).json({ message: "rating must be between 1 and 5." });
    }

    // Check that the user exists
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found." });

    // Find the course: by MongoDB _id if courseId is a valid ObjectId, otherwise by custom course id
    const course =
    mongoose.Types.ObjectId.isValid(courseId)
      ? await Course.findById(courseId)
      : await Course.findOne({ id: courseId });

  // If the course does not exist, return error
  if (!course) return res.status(404).json({ message: "Course not found." });

   // Create and store the review
  const review = await Review.create({
    userId,
    courseId: course._id,
    rating: r,
    comment: comment || "",
  });
  // Return the created review
  return res.status(201).json({ review });
  } catch (err) {
    // Pass unexpected errors to the global error handler
    next(err);
  }
};

// GET /api/reviews/:courseId

// Returns all reviews for a specific course
exports.getCourseReviews = async (req, res, next) => {
  try {

    // Read courseId from the URL
    const { courseId } = req.params;

    // Find the course using either _id or custom id
    const course =
      mongoose.Types.ObjectId.isValid(courseId)
        ? await Course.findById(courseId)
        : await Course.findOne({ id: courseId });

     // If the course does not exist, return error
    if (!course) return res.status(404).json({ message: "Course not found." });

    // Find all reviews for the course, sort them so the newest ones appear first, populate userId with the user's name
    const reviews = await Review.find({ courseId: course._id })
      .sort({ createdAt: -1 })
      .populate("userId", "firstName lastName");

    // Return the list of reviews
    return res.status(200).json({ reviews });
  } catch (err) {
     // Pass errors to the global error handler
    next(err);
  }
};
