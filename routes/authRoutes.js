const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/signup", authController.signup);
router.post("/login", authController.login);

module.exports = router;
// router.post("/signup", async (req, res) => {
//   const { username, password, role } = req.body;

//   const existingUser = await findByUsername(username);
//   if (existingUser)
//     return res.status(400).json({ error: "User already exists" });

//   const passwordHash = await bcrypt.hash(password, 10);
//   const user = await createUser(username, passwordHash, role);

//   res.status(201).json({
//     message: "User created",
//     user: { username: user.username, role: user.role },
//   });
// });

// router.post("/login", async (req, res) => {
//   const { username, password } = req.body;

//   const user = await findByUsername(username);
//   if (!user) return res.status(401).json({ error: "Invalid credentials" });

//   const valid = await bcrypt.compare(password, user.passwordHash);
//   if (!valid) return res.status(401).json({ error: "Invalid credentials" });

//   const token = jwt.sign(
//     { id: user._id, username: user.username, role: user.role },
//     process.env.JWT_SECRET,
//     {
//       expiresIn: "1h",
//     }
//   );
