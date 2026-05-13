const usermodel = require("../models/user.model");

async function getProfileController(req, res) {
  try {
    const user = await usermodel.findById(req.user._id).select("-password");

    return res.status(200).json({
      message: "Profile fetched successfully",
      data: user,
    });
  } catch {
    return res.status(500).json({ message: "Failed to fetch profile" });
  }
}

async function updateProfileController(req, res) {
  try {
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({ message: "Username is required" });
    }

    const updatedUser = await usermodel
      .findByIdAndUpdate(req.user._id, { username }, { new: true })
      .select("-password");

    return res.status(200).json({
      message: "Profile updated successfully",
      data: updatedUser,
    });
  } catch {
    return res.status(500).json({ message: "Failed to update profile" });
  }
}

module.exports = { getProfileController, updateProfileController };