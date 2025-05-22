const Property = require("../models/Property");

async function createProperty(data) {
  return await Property.create(data);
}

async function getProperties(filter = {}) {
  return await Property.find(filter);
}

async function getPropertyById(id) {
  return await Property.findById(id);
}

module.exports = {
  createProperty,
  getProperties,
  getPropertyById,
};
