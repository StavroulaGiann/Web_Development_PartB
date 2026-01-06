// Import the Express Router to define modular route handlers
const router = require("express").Router();

// Import the controller function responsible for the "About" endpoint
const { getAbout } = require("../controllers/about.controller");

// Handle GET requests to the root path ("/"). This route is typically used to fetch "About" page data from the API
router.get("/", getAbout);

// Export the router so it can be mounted in app.js 
module.exports = router;
