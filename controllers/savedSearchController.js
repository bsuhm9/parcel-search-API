const savedSearchDao = require("../daos/savedSearchDao");

exports.create = async (req, res) => {
  try {
    const data = { ...req.body, userId: req.user.id };
    const search = await savedSearchDao.createSearch(data);
    res.status(201).json(search);
  } catch (err) {
    console.error("Create saved search error:", err); // <-- Add this
    res.status(400).json({ error: "Failed to create saved search" });
  }
};

exports.list = async (req, res) => {
  try {
    const searches = await savedSearchDao.getUserSearches(req.user.id);
    res.json(searches);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch saved searches" });
  }
};

exports.get = async (req, res) => {
  try {
    const search = await savedSearchDao.getSearchById(req.params.id);
    if (!search || search.userId.toString() !== req.user.id)
      return res.status(404).json({ error: "Not found" });
    res.json(search);
  } catch (err) {
    res.status(400).json({ error: "Failed to fetch search" });
  }
};

exports.update = async (req, res) => {
  try {
    const search = await savedSearchDao.getSearchById(req.params.id);
    if (!search || search.userId.toString() !== req.user.id)
      return res.status(403).json({ error: "Forbidden" });

    const updated = await savedSearchDao.updateSearch(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: "Failed to update saved search" });
  }
};

exports.remove = async (req, res) => {
  try {
    const search = await savedSearchDao.getSearchById(req.params.id);
    if (!search || search.userId.toString() !== req.user.id)
      return res.status(403).json({ error: "Forbidden" });

    await savedSearchDao.deleteSearch(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(400).json({ error: "Failed to delete saved search" });
  }
};
