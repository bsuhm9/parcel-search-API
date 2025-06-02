const express = require("express");
const router = express.Router();
const { batchFetchAndStore } = require("../seed/yakimaFetcher");

// POST /api/yakima/batch
router.post("/batch", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const results = await batchFetchAndStore(limit);
    res
      .status(200)
      .json({
        message: "Batch fetch and store successful",
        count: results.length,
        results,
      });
  } catch (error) {
    console.error("Batch fetch error:", error);
    res.status(500).json({ error: "Batch fetch failed" });
  }
});

module.exports = router;
