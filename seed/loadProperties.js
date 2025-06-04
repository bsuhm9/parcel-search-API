// seed/loadProperties.js
const mongoose = require("mongoose");
const Property = require("../models/Property");
const data = require("./properties.json");

require("dotenv").config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  await Property.deleteMany();
  await Property.insertMany(data);
  console.log("Seeded property data");
  mongoose.disconnect();
});
