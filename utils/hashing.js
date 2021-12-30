const bcrypt = require('bcrypt');

const createHash = async (password) => {
  return await bcrypt.hash(password, 10);
};

const compareHash = async (p, o) => {
  return await bcrypt.compare(p, o);
};

module.exports = {
  createHash,
  compareHash,
};
