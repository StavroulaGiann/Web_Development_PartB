const router = require("express").Router();
const authController = require("../controllers/auth-controller");
const validateRequest = require("../middleware/validateRequest");

router.post(
  "/register",
  validateRequest({
    body: {
      firstName: { required: true, type: "string", trim: true, minLen: 2, maxLen: 50 },
      lastName: { required: true, type: "string", trim: true, minLen: 2, maxLen: 50 },
      email: { required: true, type: "string", format: "email", trim: true, lowercase: true },
      password: { required: true, type: "string", minLen: 6, maxLen: 200 },
    },
  }),
  authController.register
);

router.post(
  "/login",
  validateRequest({
    body: {
      email: { required: true, type: "string", format: "email", trim: true, lowercase: true },
      password: { required: true, type: "string", minLen: 6, maxLen: 200 },
    },
  }),
  authController.login
);

module.exports = router;
