const mongoose = require("mongoose");

// Enrollment schema definition
const enrollmentSchema = new mongoose.Schema(
  {
    // Reference to the enrolled user
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    // Reference to the enrolled course
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
      index: true,
    },
  },
  {
    // Automatically adds createdAt and updatedAt timestamps
    timestamps: true,
  }
);

// Compound unique index to prevent the same user
// from enrolling in the same course more than once
enrollmentSchema.index({ userId: 1, courseId: 1 }, { unique: true });

// Export Enrollment model
module.exports = mongoose.model("Enrollment", enrollmentSchema);
