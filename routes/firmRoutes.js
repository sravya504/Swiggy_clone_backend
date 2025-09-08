const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const firmController = require("../controllers/firmController");
const path = require("path");

// Add firm
router.post("/addfirm", verifyToken, firmController.addFirm);

// Delete firm
router.delete("/:firmId", firmController.deleteFirmById);

// Serve uploaded images
router.get("/uploads/:imageName", (req, res) => {
  const imageName = req.params.imageName;
  res.setHeader("Content-Type", "image/jpeg");
  res.sendFile(path.join(__dirname, "..", "uploads", imageName));
});

module.exports = router;
