const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const propertyRoutes = require("./routes/properties");
const yakimaRouter = require("./routes/yakimaRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/properties", propertyRoutes);
app.use("/api/yakima", yakimaRouter);

module.exports = app;
