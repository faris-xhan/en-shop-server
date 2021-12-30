const jwt = require('jsonwebtoken');
const constants = require('../constants');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null)
    return res.status(401).json({
      status: 'failed',
      data: [],
      error: 'Failed to provide authentication token.',
    });

  jwt.verify(token, constants.jwtSecretKey, (err, user) => {
    console.log(err);
    if (err)
      return res.status(403).json({
        status: 'failed',
        data: [],
        error: 'Invalid authentication token.',
      });
    req.user = user;
    next();
  });
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.userId === req.params.id || req.user.isAdmin) {
      return next();
    } else {
      return res.status(403).json({
        type: 'failed',
        data: [],
        error: 'Authorization Failed',
      });
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      return next();
    } else {
      return res.status(403).json({
        status: 'failed',
        data: [],
        error: 'Authorization Failed (Admin Only)',
      });
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
};
