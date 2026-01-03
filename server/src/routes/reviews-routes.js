const router = require("express").Router();
const c = require("../controllers/reviews-controller");
const validateRequest = require("../middleware/validateRequest");

router.post(
  "/",
  validateRequest({
    body: {
      userId: { required: true, type: "string", format: "objectId", trim: true },
      courseId: { required: true, type: "string", trim: true }, // ✅ όχι objectId
      rating: { required: true, type: "number", coerceNumber: true, min: 1, max: 5 },
      comment: { required: false, type: "string", trim: true, maxLen: 1000 },
    },
  }),
  c.createReview
);

router.get(
  "/course/:courseId",
  validateRequest({
    params: {
      courseId: { required: true, type: "string", trim: true }, // ✅ όχι objectId
    },
  }),
  c.getCourseReviews
);

module.exports = router;
