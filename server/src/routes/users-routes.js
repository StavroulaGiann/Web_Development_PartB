const router = require("express").Router();
const User = require("../models/User");

router.post("/", async (req, res) => {
  const user = await User.create({
    name: "Test User",
    email: "test@test.com",
  });

  res.status(201).json(user);
});

module.exports = router;
