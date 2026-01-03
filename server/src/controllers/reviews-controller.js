const Review = require("../models/Review");
const User = require("../models/User");
const Course = require("../models/Course");
const mongoose = require("mongoose");


exports.createReview = async (req, res, next) => {
  try {
    const { userId, courseId, rating, comment } = req.body || {};

    if (!userId || !courseId || rating == null) {
      return res.status(400).json({ message: "userId, courseId and rating are required." });
    }

    const r = Number(rating);
    if (!Number.isFinite(r) || r < 1 || r > 5) {
      return res.status(400).json({ message: "rating must be between 1 and 5." });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found." });

    const course =
    mongoose.Types.ObjectId.isValid(courseId)
      ? await Course.findById(courseId)
      : await Course.findOne({ id: courseId });

  if (!course) return res.status(404).json({ message: "Course not found." });

  const review = await Review.create({
    userId,
    courseId: course._id,
    rating: r,
    comment: comment || "",
  });
  return res.status(201).json({ review });
  } catch (err) {
    next(err);
  }
};


exports.getCourseReviews = async (req, res, next) => {
  try {
    const { courseId } = req.params;

    const course =
      mongoose.Types.ObjectId.isValid(courseId)
        ? await Course.findById(courseId)
        : await Course.findOne({ id: courseId });

    if (!course) return res.status(404).json({ message: "Course not found." });

    const reviews = await Review.find({ courseId: course._id })
      .sort({ createdAt: -1 })
      .populate("userId", "firstName lastName");

    return res.status(200).json({ reviews });
  } catch (err) {
    next(err);
  }
};
