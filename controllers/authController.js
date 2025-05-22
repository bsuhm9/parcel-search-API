const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userDao = require("../daos/userDao");

async function signup(req, res) {
  const { email, password } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await userDao.createUser({ email, passwordHash });
  res.status(201).json({ id: user._id, email: user.email });
}

async function login(req, res) {
  const { email, password } = req.body;
  const user = await userDao.findUserByEmail(email);
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
  const token = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET
  );
  res.json({ token });
}

module.exports = {
  signup,
  login,
};
