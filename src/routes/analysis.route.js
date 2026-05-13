const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const {
  createAnalysisController,
  getAnalysisHistoryController,
} = require("../controllers/analysis.controller");

router.post("/", authMiddleware, createAnalysisController);
router.get("/history", authMiddleware, getAnalysisHistoryController);

module.exports = router;
