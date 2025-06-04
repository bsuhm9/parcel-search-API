const mongoose = require("mongoose");

const ParcelSchema = new mongoose.Schema({
  ParcelNumber: { type: String, required: true, unique: true },
  OwnerName: { type: String },
  SitusAddress: { type: String },
});

// Index on OwnerName
ParcelSchema.index({ OwnerName: 1 });

module.exports = mongoose.model("Parcel", ParcelSchema, "parcels");
