const mongoose = require("mongoose");

const ParcelSchema = new mongoose.Schema({
  ParcelNumber: { type: String, required: true, unique: true },
  OwnerName: { type: String },
  SitusAddress: { type: String },
});

module.exports = mongoose.model("Parcel", ParcelSchema, "parcels");
