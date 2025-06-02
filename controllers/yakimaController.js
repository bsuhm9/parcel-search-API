import Parcel from "../models/parcel.js";
import { fetchParcelsByNumbers } from "./seed/YakimaFetcher.js";

export const fetchAndStoreParcels = async (req, res) => {
  const { parcelNumbers } = req.body;

  if (!Array.isArray(parcelNumbers) || parcelNumbers.length === 0) {
    return res
      .status(400)
      .json({ error: "parcelNumbers must be a non-empty array." });
  }

  try {
    const parcels = await fetchParcelsByNumbers(parcelNumbers);

    const saveOps = parcels.map(async (parcel) => {
      await Parcel.findOneAndUpdate(
        { parcelNumber: parcel.ParcelNumber },
        parcel,
        { upsert: true, new: true }
      );
    });

    await Promise.all(saveOps);

    res
      .status(200)
      .json({ message: `${parcels.length} parcels saved or updated.` });
  } catch (err) {
    console.error("Error fetching/storing parcels:", err.message);
    res.status(500).json({ error: "Failed to fetch/store parcels." });
  }
};
