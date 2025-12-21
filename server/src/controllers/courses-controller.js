const mongoose = require("mongoose")
const Course = require("../models/Course");

async function getCourses(req, res, next) {
  try {
    const courses = await Course.find({}).sort({ createdAt: -1 });
    res.json(courses);
  } catch (err) {
    next(err);
  }
}

// ✅ GET /api/courses/:key  όπου key μπορεί να είναι id ή slug ή Mongo _id
async function getCourseByKey(req, res, next) {
  try {
    const { key } = req.params;

    const or = [{ id: key }];

    // αν έχεις και slug στο schema σου, κράτα το:
    or.push({ slug: key });

    // ✅ αν το key είναι valid ObjectId, ψάχνουμε και με _id
    if (mongoose.Types.ObjectId.isValid(key)) {
      or.push({ _id: key });
    }

    const course = await Course.findOne({ $or: or });

    if (!course) return res.status(404).json({ message: "Course not found" });

    res.json(course);
  } catch (err) {
    next(err);
  }
}

exports.createCourse = async (req, res, next) => {
  try {
    const { title, category, description, level, format, durationWeeks, language, videoTitle, videoUrl } =
      req.body || {};

    if (!title || !category) {
      return res.status(400).json({ message: "title and category are required" });
    }

    const created = await Course.create({
      title,
      category,
      description,
      level,
      format,
      durationWeeks,
      language,
      videoTitle,
      videoUrl,
    });

    return res.status(201).json(created);
  } catch (err) {
    next(err);
  }
};
module.exports = { getCourses, getCourseByKey };