const parcelDao = require("../daos/parcelsDao");

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

module.exports = {
  listParcels,
  getParcel,
  createParcel,
  updateParcel,
  deleteParcel,
};
