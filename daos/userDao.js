const User = require("../models/user");

async function findByUsername(username) {
  return User.findOne({ username });
}

async function createUser(username, passwordHash, role = "user") {
  return User.create({ username, passwordHash, role });
}

module.exports = {
  findByUsername,
  createUser,
};
