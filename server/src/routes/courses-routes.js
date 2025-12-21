const router = require("express").Router();
const { getCourses, getCourseByKey } = require("../controllers/courses-controller");

router.get("/", getCourses);
router.get("/:key", getCourseByKey);

module.exports = router;
