const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userDao = require("../daos/userDao");

// signup and login using username + role
async function signup(req, res) {
  const { username, password, role } = req.body;
  const existing = await userDao.findByUsername(username);
  if (existing) {
    return res.status(400).json({ error: "User already exists" });
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await userDao.createUser(username, passwordHash, role);
  res.status(201).json({ username: user.username, role: user.role });
}

async function login(req, res) {
  const { username, password } = req.body;
  const user = await userDao.findByUsername(username);
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
  const token = jwt.sign(
    { id: user._id, username: user.username, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  res.json({ token });
}

module.exports = {
  signup,
  login,
};
//
