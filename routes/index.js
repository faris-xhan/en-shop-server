const express = require('express');
const {
  varifyToken,
  varifyTokenAndAuthorization,
  varifyTokenAndAdmin,
} = require('../middlewares/tokenVarifications');
const router = express.Router();

router.get('/', varifyToken, (req, res, next) => {
  res.json(req.user);
});

router.get('/admin', varifyTokenAndAdmin, (req, res, next) => {
  return res.status.json({ greet: 'Welcome Admin!' });
});

router.get('/:id', varifyTokenAndAuthorization, (req, res, next) => {
  return res.json({ id: req.params.id });
});

module.exports = router;
