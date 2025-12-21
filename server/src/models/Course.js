const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    // Τα δικά σου "unique id" (π.χ. "py-foundations")
    id: { type: String, required: true, unique: true, index: true },

    // url-friendly (π.χ. "py-foundations")
    slug: { type: String, required: true, unique: true, index: true },

    title: { type: String, required: true, trim: true },
    subtitle: { type: String, default: "" },

    category: {
      type: String,
      required: true,
      enum: ["programming", "web", "networks", "security"],
      index: true,
    },

    level: {
      type: String,
      required: true,
      enum: ["beginner", "intermediate", "advanced"],
      index: true,
    },

    duration: { type: String, default: "" },
    language: { type: String, default: "GR" },
    mode: { type: String, default: "self-paced" },

    shortDescription: { type: String, default: "" },
    longDescription: { type: String, default: "" },

    lessonsCount: { type: Number, default: 0, min: 0 },
    projectsCount: { type: Number, default: 0, min: 0 },

    hasCertificate: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },
    isNew: { type: Boolean, default: false },
    popular: { type: Boolean, default: false },

    rating: { type: Number, default: 0, min: 0, max: 5 },
    ratingCount: { type: Number, default: 0, min: 0 },

    thumbnail: { type: String, default: "" },

    tags: { type: [String], default: [] },

    available: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
