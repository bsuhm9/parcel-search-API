const User = require("../models/User");

async function createUser({ email, passwordHash }) {
  const user = new User({ email, passwordHash });
  return await user.save();
}

async function findUserByEmail(email) {
  return await User.findOne({ email });
}

module.exports = {
  createUser,
  findUserByEmail,
};
