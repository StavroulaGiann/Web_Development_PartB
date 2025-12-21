const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, index: true },

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

    language: { type: String, default: "GR", index: true },

    pages: { type: Number, default: 0, min: 0 },
    year: { type: Number, default: null },
    author: { type: String, default: "" },

    shortDescription: { type: String, default: "" },
    longDescription: { type: String, default: "" },

    isFeatured: { type: Boolean, default: false },
    isNew: { type: Boolean, default: false },
    popular: { type: Boolean, default: false },

    rating: { type: Number, default: 0, min: 0, max: 5 },
    ratingCount: { type: Number, default: 0, min: 0 },

    available: { type: Boolean, default: true },

    tags: { type: [String], default: [] },

    image: { type: String, default: "" },
    imageSrcSet: { type: String, default: "" },
    imageSizes: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);
