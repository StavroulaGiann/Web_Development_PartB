const router = require("express").Router();

// προσωρινό endpoint για τεστ
router.get("/ping", (req, res) => res.json({ ok: true, route: "auth" }));

module.exports = router;
