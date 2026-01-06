const mongoose = require("mongoose");

// Book schema definition
const bookSchema = new mongoose.Schema(
  {
    // Custom string ID for the book (unique & indexed for fast lookup)
    id: { type: String, required: true, unique: true, index: true },

    // Main title of the book
    title: { type: String, required: true, trim: true },

    // Optional subtitle
    subtitle: { type: String, default: "" },

    // Book category (restricted to specific values)
    category: {
      type: String,
      required: true,
      enum: ["programming", "web", "networks", "security"],
      index: true,
    },

    // Difficulty level of the book
    level: {
      type: String,
      required: true,
      enum: ["beginner", "intermediate", "advanced"],
      index: true,
    },

    // Language code (default: Greek)
    language: { type: String, default: "GR", index: true },

    // Number of pages
    pages: { type: Number, default: 0, min: 0 },

    // Publication year
    year: { type: Number, default: null },

    // Author name
    author: { type: String, default: "" },

    // Short description (used in listings/cards)
    shortDescription: { type: String, default: "" },

    // Detailed description (used in book details page)
    longDescription: { type: String, default: "" },

    // Flags for UI filtering/highlighting
    isFeatured: { type: Boolean, default: false },
    isNew: { type: Boolean, default: false },
    popular: { type: Boolean, default: false },

    // Average rating (0–5)
    rating: { type: Number, default: 0, min: 0, max: 5 },

    // Total number of ratings
    ratingCount: { type: Number, default: 0, min: 0 },

    // Availability status
    available: { type: Boolean, default: true },

    // Free-form tags for search/filtering
    tags: { type: [String], default: [] },

    // Image path or URL
    image: { type: String, default: "" },

    // Responsive image attributes
    imageSrcSet: { type: String, default: "" },
    imageSizes: { type: String, default: "" },
  },
  {
    // Automatically adds createdAt and updatedAt fields
    timestamps: true,
  }
);

// Export Book model
module.exports = mongoose.model("Book", bookSchema);
