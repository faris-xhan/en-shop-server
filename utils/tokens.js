const jsonwebtoken = require("jsonwebtoken");
const constants = require("../constants");

const generateAccessToken = (data) => {
  return jsonwebtoken.sign(data, constants.jwtSecretKey, { expiresIn: "1d" });
};

module.exports = {
  generateAccessToken,
};
