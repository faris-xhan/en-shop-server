const express = require('express');
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require('../middlewares/tokenVerifications');
const router = express.Router();

router.get('/', verifyToken, (req, res, next) => {
  res.json(req.user);
});

router.get('/admin', verifyTokenAndAdmin, (req, res, next) => {
  return res.status.json({ greet: 'Welcome Admin!' });
});

router.get('/:id', verifyTokenAndAuthorization, (req, res, next) => {
  return res.json({ id: req.params.id });
});

module.exports = router;
