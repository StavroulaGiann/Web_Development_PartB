
// Load environment variables from .env into process.env
require("dotenv").config();

// Core dependencies
const express = require("express"); // Web framework
const cors = require("cors");       // Enable Cross-Origin Resource Sharing
const path = require("path");       // Utility for working with file paths

// Internal modules
const connectDB = require("./config/db");               // MongoDB connection helper
const errorHandler = require("./middleware/errorHandler"); // Centralized error handler

// Route modules 
const authRoutes = require("./routes/auth-routes");         // Authentication & authorization
const booksRoutes = require("./routes/books-routes");       // Books API
const usersRoutes = require("./routes/users-routes");       // Users API
const coursesRoutes = require("./routes/courses-routes");   // Courses API
const aboutRoutes = require("./routes/about.routes");       // About page content
const enrollmentsRoutes = require("./routes/enrollments-routes"); // Course enrollments
const reviewsRoutes = require("./routes/reviews-routes");   // Reviews API

// Create Express application instance
const app = express();


 // Global middleware

// Enable CORS for all routes 
app.use(cors());

// Parse incoming JSON request bodies and populate req.body
app.use(express.json());

// About route (mounted early, but order does not matter here)
app.use("/api/about", aboutRoutes);

// Serve static files (images, uploads, etc.)
app.use("/team", express.static(path.join(__dirname, "..", "public", "team")));

// Books images
app.use("/uploads", express.static(path.join(__dirname, "..", "public")));


//Database connection

// Connect to MongoDB using the URI from environment variables
connectDB(process.env.MONGODB_URI);


//Health check endpoint
app.get("/health", (req, res) => {
  res.json({ ok: true });
});


// API routes
app.use("/api/auth", authRoutes);
app.use("/api/books", booksRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/courses", coursesRoutes);
app.use("/api/enrollments", enrollmentsRoutes);
app.use("/api/reviews", reviewsRoutes);


//Global error handler
app.use(errorHandler);


//Start HTTP server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
  console.log("PORT:", process.env.PORT);
  console.log("MONGODB_URI:", process.env.MONGODB_URI);
});
