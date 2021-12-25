const jwt = require('jsonwebtoken');
const constants = require('../constants');

const authenticateToken = (req, res, next) => {
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

module.exports = authenticateToken;
