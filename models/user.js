const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  savedProperties: [{ type: mongoose.Schema.Types.ObjectId, ref: "Property" }],
});

module.exports = mongoose.model("User", userSchema);
