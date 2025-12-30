// src/app.js
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");

// Routes
const authRoutes = require("./routes/auth-routes");
const booksRoutes = require("./routes/books-routes");
const usersRoutes = require("./routes/users-routes");
const coursesRoutes = require("./routes/courses-routes");
const aboutRoutes = require("./routes/about.routes");
const enrollmentsRoutes = require("./routes/enrollments-routes");
// Αν έχεις reviews routes, πρόσθεσε κι αυτό:
// const reviewsRoutes = require("./routes/reviews.routes");

const app = express();

// Middleware (global)
app.use(cors());
app.use(express.json());
app.use("/api/about", aboutRoutes);
// static φωτογραφίες
app.use("/uploads", express.static(path.join(__dirname, "..", "public")));
// DB connection
connectDB(process.env.MONGODB_URI);

// Health check (προαιρετικό αλλά χρήσιμο)
app.get("/health", (req, res) => {
  res.json({ ok: true });
});

// Mount routes
app.use("/api/auth", authRoutes);
app.use("/api/books", booksRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/courses", coursesRoutes);
app.use("/api/enrollments", enrollmentsRoutes);
app.use("/api/auth", require("./routes/auth-routes"));

// app.use("/api/reviews", reviewsRoutes);

// Error handler (ΠΡΕΠΕΙ τελευταίο)
app.use(errorHandler);

// Start server (αφού δεν έχεις server.js)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log("PORT:", process.env.PORT);
  console.log("MONGODB_URI:", process.env.MONGODB_URI);
;
});

