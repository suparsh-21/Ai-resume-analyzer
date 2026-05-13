const express = require("express");
const router = express.Router();
const {
  registerController,
  loginController,
  logoutController,
  getSecurityQuestionController,
  resetPasswordController,
} = require("../controllers/auth.controller");

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/logout", logoutController);

// Forgot password routes
router.post("/get-security-question", getSecurityQuestionController);
router.post("/reset-password", resetPasswordController);

module.exports = router;
