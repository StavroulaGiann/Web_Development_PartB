const mongoose = require("mongoose");

// Review schema definition
const reviewSchema = new mongoose.Schema(
  {
    // Reference to the user who wrote the review
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    // Reference to the course being reviewed
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
      index: true,
    },

    // Rating given by the user (1 to 5)
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    // Optional text comment for the review
    comment: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    // Automatically adds createdAt and updatedAt timestamps
    timestamps: true,
  }
);

// Export Review model
module.exports = mongoose.model("Review", reviewSchema);
