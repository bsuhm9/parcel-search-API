const SavedSearch = require("../models/savedSearch");

async function createSearch(data) {
  return await SavedSearch.create(data);
}

async function getUserSearches(userId) {
  return await SavedSearch.find({ userId });
}

async function getSearchById(id) {
  return await SavedSearch.findById(id);
}

async function updateSearch(id, data) {
  return await SavedSearch.findByIdAndUpdate(id, data, { new: true });
}

async function deleteSearch(id) {
  return await SavedSearch.findByIdAndDelete(id);
}

module.exports = {
  createSearch,
  getUserSearches,
  getSearchById,
  updateSearch,
  deleteSearch,
};
