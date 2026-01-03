const Enrollment = require("../models/Enrollment");
const User = require("../models/User");
const Course = require("../models/Course");
const mongoose = require("mongoose");

exports.createEnrollment = async (req, res, next) => {
  try {
    const { userId, courseId } = req.body || {};
    if (!userId || !courseId) {
      return res.status(400).json({ message: "userId and courseId are required." });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found." });

    const course =
    mongoose.Types.ObjectId.isValid(courseId)
      ? await Course.findById(courseId)
      : await Course.findOne({ id: courseId });

  if (!course) return res.status(404).json({ message: "Course not found." });

  const enrollment = await Enrollment.create({ userId, courseId: course._id });
  return res.status(201).json({ enrollment });
    } catch (err) {
    // duplicate index => ήδη εγγεγραμμένος
    if (err && err.code === 11000) {
      return res.status(409).json({ message: "User already enrolled in this course." });
    }
    next(err);
  }
};

exports.getEnrollmentsByUser = async (req, res, next) => {
  try {
    const userId = req.query.userId;
    if (!userId) return res.status(400).json({ message: "userId query param is required." });

    const enrollments = await Enrollment.find({ userId }).populate("courseId");
    return res.status(200).json({ enrollments });
  } catch (err) {
    next(err);
  }
};
