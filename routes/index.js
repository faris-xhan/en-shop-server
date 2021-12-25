const express = require("express");
const authenticateToken = require("../middlewares/authenticateToken");
const router = express.Router();

router.get("/", authenticateToken, (req, res, next) => {
  res.json({ message: "Okay" });
});

module.exports = router;
