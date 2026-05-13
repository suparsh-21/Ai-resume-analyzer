const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const { getProfileController, updateProfileController } = require("../controllers/user.controller");

router.get("/me", authMiddleware, getProfileController);
router.put("/me", authMiddleware, updateProfileController);

module.exports = router;
