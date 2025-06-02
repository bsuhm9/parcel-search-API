const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const parcelRoutes = require("./routes/parcelRoutes");
const yakimaRouter = require("./routes/yakimaRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes); //endpoints are POST http://localhost:3000/api/auth/signup, POST http://localhost:3000/api/auth/login
app.use("/api/parcels", parcelRoutes);
app.use("/api/yakima", yakimaRouter);

module.exports = app;
