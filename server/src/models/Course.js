const mongoose = require("mongoose");

// Course schema definition
const courseSchema = new mongoose.Schema(
  {
    // Custom unique course ID (e.g. "py-foundations")
    id: { type: String, required: true, unique: true, index: true },

    // URL-friendly identifier used in routes (e.g. /courses/py-foundations)
    slug: { type: String, required: true, unique: true, index: true },

    // Main course title
    title: { type: String, required: true, trim: true },

    // Optional subtitle
    subtitle: { type: String, default: "" },

    // Course category (restricted to specific values)
    category: {
      type: String,
      required: true,
      enum: ["programming", "web", "networks", "security"],
      index: true,
    },

    // Difficulty level of the course
    level: {
      type: String,
      required: true,
      enum: ["beginner", "intermediate", "advanced"],
      index: true,
    },

    // Estimated duration (e.g. "6 weeks", "12 hours")
    duration: { type: String, default: "" },

    // Language of the course content
    language: { type: String, default: "GR" },

    // Learning mode (e.g. self-paced, instructor-led)
    mode: { type: String, default: "self-paced" },

    // Short description used in listings/cards
    shortDescription: { type: String, default: "" },

    // Full description used in course details page
    longDescription: { type: String, default: "" },

    // Number of lessons included in the course
    lessonsCount: { type: Number, default: 0, min: 0 },

    // Number of projects included in the course
    projectsCount: { type: Number, default: 0, min: 0 },

    // Whether the course provides a certificate
    hasCertificate: { type: Boolean, default: false },

    // Flags used for UI filtering/highlighting
    isFeatured: { type: Boolean, default: false },
    isNew: { type: Boolean, default: false },
    popular: { type: Boolean, default: false },

    // Average rating (0–5)
    rating: { type: Number, default: 0, min: 0, max: 5 },

    // Total number of ratings
    ratingCount: { type: Number, default: 0, min: 0 },

    // Thumbnail image path or URL
    thumbnail: { type: String, default: "" },

    // Free-form tags for searching/filtering
    tags: { type: [String], default: [] },

    // Availability status
    available: { type: Boolean, default: true },
  },
  {
    // Automatically adds createdAt and updatedAt timestamps
    timestamps: true,
  }
);

// Export Course model
module.exports = mongoose.model("Course", courseSchema);
