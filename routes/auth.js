const express = require("express");
const { User } = require("../models");

const router = express.Router();

router.post("/register", async (req, res, next) => {
  try {
    const user = new User(req.body);
    const savedUser = await user.save();
    return res.json(savedUser);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
