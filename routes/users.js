const express = require('express');
const { User } = require('../models');
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require('../middlewares/tokenVerifications');
const { createHash } = require('../utils/hashing');

const router = express.Router();

// Get all users
router.get('/', verifyTokenAndAdmin, async (req, res, next) => {
  const query = req.query.new;
  try {
    const users = query
      ? await User.find({}, { password: 0, _v: 0 }).sort({ _id: -1 }).limit(5)
      : await User.find({}, { password: 0, _v: 0 });
    res.json(users);
  } catch (err) {
    next(error);
  }
});

// GET USER
router.get('/find/:id', verifyTokenAndAdmin, async (req, res, next) => {
  try {
    const user = await User.findOne(
      { _id: req.params.id },
      { password: 0, _v: 0 }
    );
    if (!user)
      return res.status(404).json({
        status: 'success',
        error: 'No user',
        data: [],
      });

    return res.json(user);
  } catch (error) {
    next(error);
  }
});

// Get users stats
router.get('/stats', verifyTokenAndAdmin, async (req, res, next) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: '$createdAt' },
        },
      },
      {
        $group: {
          _id: '$month',
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

// Update user
router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {
  if (req.body.password) {
    req.body.password = await createHash(req.body.password);
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { fields: { password: 0, __v: 0 }, new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
