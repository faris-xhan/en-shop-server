const express = require('express');
const { User } = require('../models');
const tokens = require('../utils/tokens');
const { compareHash, createHash } = require('../utils/hashing');

const router = express.Router();

router.post('/register', async (req, res, next) => {
  const { email, password, username } = req.body;
  try {
    const hashedPassword = await createHash(password);
    const user = new User({ email, username, password: hashedPassword });
    const savedUser = await user.save();
    return res.json({ email: savedUser.email, id: user._id });
  } catch (error) {
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    const ismatch = await compareHash(password, user.password);
    if (ismatch) {
      const accessToken = tokens.generateAccessToken({
        userId: user._id,
        isAdmin: user.isAdmin,
      });
      return res.json({ email: user.email, accessToken });
    }
    return res.status(301).json({ error: 'Incorrect password' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
