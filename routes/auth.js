const bcrypt = require("bcrypt");
const express = require("express");
const tokens = require("../utils/tokens");
const { User } = require("../models");

const router = express.Router();

router.post("/register", async (req, res, next) => {
  const { email, password, username } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, username, password: hashedPassword });
    const savedUser = await user.save();
    return res.json({ email: savedUser.email });
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    const ismatch = await bcrypt.compare(password, user.password);
    if (ismatch) {
      const accessToken = tokens.generateAccessToken({
        userId: user._id,
        isAdmin: user.isAdmin,
      });
      return res.json({ email: user.email, accessToken });
    }
    return res.status(301).json({ error: "Incorrect password" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
