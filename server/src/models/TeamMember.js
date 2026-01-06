const mongoose = require("mongoose");

// Team member schema definition
const TeamMemberSchema = new mongoose.Schema(
  {
    // Full name of the team member
    name: { type: String, required: true },

    // Role or position in the team
    role: { type: String, required: true },

    // Short biography or description
    bio: { type: String, required: true },

    // URL or path to the profile photo
    photoUrl: { type: String, required: true },

    // Order used for sorting team members in the UI
    order: { type: Number, default: 0 },
  },
  {
    // Automatically adds createdAt and updatedAt timestamps
    timestamps: true,
  }
);

// Export TeamMember model
module.exports = mongoose.model("TeamMember", TeamMemberSchema);
