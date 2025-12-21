const router = require("express").Router();

router.post("/", (req, res) => res.status(201).json({ ok: true, route: "enrollments" }));

module.exports = router;
