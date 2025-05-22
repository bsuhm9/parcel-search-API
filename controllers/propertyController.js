const propertyDao = require("../daos/propertyDao");

async function listProperties(req, res) {
  const properties = await propertyDao.getProperties(req.query);
  res.json(properties);
}

async function getProperty(req, res) {
  const property = await propertyDao.getPropertyById(req.params.id);
  if (!property) return res.status(404).json({ error: "Not found" });
  res.json(property);
}

module.exports = {
  listProperties,
  getProperty,
};
