// daos/yakimaParcelsDao.js
const YakimaParcel = require("../models/yakimaParcel");

async function findByCriteria(criteria) {
  return await YakimaParcel.find(criteria);
}

module.exports = { findByCriteria };
