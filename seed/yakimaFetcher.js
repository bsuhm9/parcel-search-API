const Parcel = require("../models/parcel");
const YakimaParcel = require("../models/yakimaParcel");
const axios = require("axios");

async function fetchParcelDetails(parcelNumber) {
  const url = `https://yes.co.yakima.wa.us/AssessorAPI/ParcelDetails/GetByParcelNumber/${parcelNumber}`; // <-- adjust this to the actual API URL
  try {
    const { data } = await axios.get(url, { timeout: 10000 }); // 10s timeout
    console.log(`Fetched details for ${parcelNumber}`);
    return { data };
  } catch (error) {
    console.error(`Error fetching ${parcelNumber}:`, error.message);
    return { error: error.message };
  }
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function normalizeSaleRecords(SaleRecords) {
  return SaleRecords.map((record) => ({
    ExciseID: record.ExciseID || record.ExciseID || null,
    ExciseNumber: record.ExciseNumber || record.ExciseNumber || null,
    GrantorName: record.GrantorName || record.GrantorName || null,
    ExciseDate: record.ExciseDate
      ? new Date(record.ExciseDate)
      : record.ExciseDate
      ? new Date(record.ExciseDate)
      : null,
    SalePrice: record.SalePrice || record.SalePrice || 0,
    DocumentType: record.DocumentType || record.DocumentType || null,
    SaleVerify: record.SaleVerify || record.SaleVerify || null,
  }));
}

async function batchFetchAndStore(limit = 10, delayMs = 3000) {
  try {
    console.log("Starting batch fetch...");

    const baseParcels = await Parcel.find({}, { ParcelNumber: 1, _id: 0 })
      .limit(limit)
      .lean();
    const parcelNumbers = baseParcels.map((p) => p.ParcelNumber);
    console.log("Parcel numbers to fetch:", parcelNumbers);

    const results = [];

    for (const parcelNumber of parcelNumbers) {
      const detail = await fetchParcelDetails(parcelNumber);

      if (detail.data && detail.data.ParcelNumber) {
        // Only normalize SaleRecords if they exist
        if (Array.isArray(detail.data.SaleRecords)) {
          detail.data.SaleRecords = normalizeSaleRecords(
            detail.data.SaleRecords
          );
        }
        const saved = await YakimaParcel.findOneAndUpdate(
          { parcelNumber: detail.data.ParcelNumber },
          detail.data,
          { upsert: true, new: true }
        );
        console.log("Saved:", saved.ParcelNumber);
        results.push(saved);
      } else {
        console.warn("Skipping invalid result for:", parcelNumber);
        console.warn(
          "Reason:",
          detail.error || "Missing ParcelNumber in response"
        );
      }

      // Wait before the next iteration
      await delay(delayMs);
    }

    console.log("Batch complete");
    return results;
  } catch (err) {
    console.error("Error in batchFetchAndStore:", err);
    throw err;
  }
}

module.exports = { batchFetchAndStore };
