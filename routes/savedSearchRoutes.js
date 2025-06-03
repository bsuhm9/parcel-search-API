const express = require("express");
const router = express.Router();
const controller = require("../controllers/savedSearchController");
const { authenticate } = require("../middleware/auth");

router.use(authenticate);

router.post("/", controller.create);
router.get("/", controller.list);
router.get("/:id", controller.get);
router.put("/:id", controller.update);
router.delete("/:id", controller.remove);

module.exports = router;
