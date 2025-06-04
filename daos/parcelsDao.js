const Parcel = require("../models/parcel");

async function createParcel(data) {
  return await Parcel.create(data);
}

async function getParcel(filter = {}) {
  return await Parcel.find(filter);
}

async function getParcelById(id) {
  return await Parcel.findById(id);
}

async function findByIdAndUpdate(id, updateData) {
  return await Parcel.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
}

async function findByIdAndDelete(id) {
  return await Parcel.findByIdAndDelete(id);
}

async function findMatchingParcels(criteria) {
  return await Parcel.find(criteria).limit(100);
}

module.exports = {
  createParcel,
  getParcel,
  getParcelById,
  findByIdAndUpdate,
  findByIdAndDelete,
  findMatchingParcels,
};
//
