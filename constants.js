require("dotenv").config();

const env = process.env;

module.exports = {
  mongodbStr: env.MONGODB || "mongodb://localhost:27017/test",
};