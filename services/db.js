const mongoose = require("mongoose");
const constants = require("../constants");

const createConnection = async () => {
  const { connection } = await mongoose.connect(constants.mongodbStr);
  const connectedTo = connection._connectionString;
  return `Succesfully Connected to: ${connectedTo}`;
};

module.exports = {
  createConnection,
};
