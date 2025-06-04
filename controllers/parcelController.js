const parcelDao = require("../daos/parcelsDao");
const savedSearchDao = require("../daos/savedSearchDao");
const yakimaParcelDao = require("../daos/yakimaParcelsDao");

async function listParcels(req, res) {
  const properties = await parcelDao.getParcel(req.query);
  res.json(properties);
}

async function getParcel(req, res) {
  const parcel = await parcelDao.getParcelById(req.params.id);
  if (!parcel) return res.status(404).json({ error: "Not found!" });
  res.json(parcel);
}

// Create a new parcel (admin only)
async function createParcel(req, res) {
  try {
    const parcel = await parcelDao.createParcel(req.body);
    const saved = await parcel.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("Create error:", err);
    res.status(400).json({ error: "Failed to create parcel" });
  }
}

// Update parcel by ID (admin only)
async function updateParcel(req, res) {
  try {
    const updated = await parcelDao.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ error: "Parcel not found" });
    res.json(updated);
  } catch (err) {
    console.error("Update error:", err);
    res.status(400).json({ error: "Failed to update parcel" });
  }
}

// Delete parcel by ID (admin only)
async function deleteParcel(req, res) {
  try {
    const deleted = await parcelDao.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Parcel not found" });
    res.json({ message: "Parcel deleted" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(400).json({ error: "Failed to delete parcel" });
  }
}

async function runSavedSearch(req, res) {
  try {
    const search = await savedSearchDao.getSearchById(req.params.id);

    if (!search) return res.status(404).json({ error: "Search not found" });

    if (search.userId.toString() !== req.user.id && req.user.role !== "admin") {
      return res
        .status(403)
        .json({ error: "User not authorized for this search" });
    }

    const criteria = search.criteria;
    const results = await yakimaParcelDao.findByCriteria(criteria); // Use YakimaParcels
    res.json(results);
  } catch (err) {
    console.error("Failed to run saved search", err);
    res.status(500).json({ error: "Failed to run saved search" });
  }
}

module.exports = {
  listParcels,
  getParcel,
  createParcel,
  updateParcel,
  deleteParcel,
  runSavedSearch,
};
//
