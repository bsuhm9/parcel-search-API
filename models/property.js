const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
  },
  condition: String,
  yearBuilt: Number,
  bedrooms: Number,
  bathrooms: Number,
  squareFeet: Number,
  price: Number,
  description: String,
  listedAt: { type: Date, default: Date.now },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

propertySchema.index({ "address.street": "text", description: "text" });

module.exports = mongoose.model("Property", propertySchema);
