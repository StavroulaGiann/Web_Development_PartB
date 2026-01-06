// Import mongoose so we can use MongoDB helpers (e.g. ObjectId check)
const mongoose = require("mongoose")

// Import the Course model to read/write courses from the database
const Course = require("../models/Course");

// GET /api/courses

// Returns all courses stored in the database. Courses are sorted so the newest ones appear first.
async function getCourses(req, res, next) {
  try {
     // Fetch all courses
    const courses = await Course.find({}).sort({ createdAt: -1 });

    // Send them back to the client
    res.json(courses);
  } catch (err) {

    // Pass errors to the global error handler
    next(err);
  }
}

// GET /api/courses/:key  

// Returns a single course.
async function getCourseByKey(req, res, next) {
  try {
     // Read the key from the URL
    const { key } = req.params;

    //Try to find the course using different fields
    const or = [{ id: key }];

    // Also check the slug (if your schema supports it)
    or.push({ slug: key });

     // If the key is a valid MongoDB ObjectId, also try searching by _id
    if (mongoose.Types.ObjectId.isValid(key)) {
      or.push({ _id: key });
    }

    // Search for a course that matches any of the above
    const course = await Course.findOne({ $or: or });

     // If no course is found, return 404
    if (!course) return res.status(404).json({ message: "Course not found" });

    // If found, return the course
    res.json(course);
  } catch (err) {
    next(err);
  }
}


// POST /api/courses

// Creates a new course in the database
exports.createCourse = async (req, res, next) => {
  try {
    // Creates a new course in the database
    const { title, category, description, level, format, durationWeeks, language, videoTitle, videoUrl } =
      req.body || {};

    // Basic validation: title and category are required
    if (!title || !category) {
      return res.status(400).json({ message: "title and category are required" });
    }

    // Create and save the course
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

    // Return the created course
    return res.status(201).json(created);
  } catch (err) {
    next(err);
  }
};

// Export controller functions
module.exports = { getCourses, getCourseByKey };