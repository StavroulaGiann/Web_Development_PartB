const mongoose = require("mongoose");
const dotenv = require("dotenv");
const TeamMember = require("../models/TeamMember");

// Load environment variables from .env file
dotenv.config();

// Seeds the TeamMember collection with initial data
async function seedTeamMembers() {
  try {
    // Connect to MongoDB using the URI from environment variables
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");

    // Remove all existing team members to avoid duplicates
    await TeamMember.deleteMany();

    // Insert predefined team members
    await TeamMember.insertMany([
      {
        // Full name of the team member
        name: "Γιαννακοπούλου Σταυρούλα",

        // Academic email address
        email: "p3220027@aueb.gr",

        // Short role description shown on the About page
        bio: "Responsible for UI and SPA logic",

        // Public URL to the profile photo (served via Express static middleware)
        photoUrl: "/team/stavroula.jpg",

        // Display order on the About page
        order: 1,
      },
      {
        // Full name of the team member
        name: "Καραγιαννάκος Αριστείδης",

        // Academic email address
        email: "p3220066@aueb.gr",

        // Short role description shown on the About page
        bio: "Responsible for UI and SPA logic",

        // Public URL to the profile photo (served via Express static middleware)
        photoUrl: "/team/member.png",

        // Display order on the About page
        order: 2,
      },
    ]);

    // Log success message and exit the process
    console.log("Team members seeded successfully");
    process.exit(0);
  } catch (err) {
    // Log any error that occurs during seeding
    console.error("Seed team error:", err);
    process.exit(1);
  }
}

// Execute the seeding function
seedTeamMembers();
