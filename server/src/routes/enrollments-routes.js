const router = require("express").Router();
const c = require("../controllers/enrollments-controller");
const validateRequest = require("../middleware/validateRequest");

router.post(
  "/",
  validateRequest({
    body: {
      userId: { required: true, type: "string", format: "objectId", trim: true },
      courseId: { required: true, type: "string", trim: true }, // ✅ όχι objectId
    },
  }),
  c.createEnrollment
);

router.get("/", c.getEnrollmentsByUser);

module.exports = router;
