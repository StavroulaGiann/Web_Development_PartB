const router = require("express").Router();
const authController = require("../controllers/auth-controller");

router.post("/register", authController.register);

// προσωρινά ΔΕΝ υπάρχει login στο controller σου
// router.post("/login", authController.login);

module.exports = router;
