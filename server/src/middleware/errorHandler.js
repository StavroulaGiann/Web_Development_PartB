// Global error handling middleware for Express. It catches any error passed with next(err)

module.exports = (err, req, res, next) => {
  // Print the full error to the server console (for debugging)
  console.error(err);

  // Send a generic 500 response in JSON format, err.message contains the actual error message
  res.status(500).json({
    message: "Server error",
    error: err.message,
  });
};
