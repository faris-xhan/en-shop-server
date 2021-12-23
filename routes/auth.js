const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  return res.json({ msg: "Working on auth route" });
});

module.exports = router;
