const mongoose = require("mongoose");

const ParcelSchema = new mongoose.Schema({
  ParcelNumber: { type: String, required: true, unique: true },
});

module.exports = mongoose.model("Parcel", ParcelSchema);
