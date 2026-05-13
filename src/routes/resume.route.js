const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware");
const {
  uploadResumeController,
  getAllResumesController,
  getResumeByIdController,
  deleteResumeController,
} = require("../controllers/resume.controller");

router.post("/upload", authMiddleware, upload.single("resume"), uploadResumeController);
router.get("/", authMiddleware, getAllResumesController);
router.get("/:id", authMiddleware, getResumeByIdController);
router.delete("/:id", authMiddleware, deleteResumeController);

module.exports = router;
