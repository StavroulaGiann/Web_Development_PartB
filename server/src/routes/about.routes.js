const router = require("express").Router();
const { getAbout } = require("../controllers/about.controller");

router.get("/", getAbout);

module.exports = router;
