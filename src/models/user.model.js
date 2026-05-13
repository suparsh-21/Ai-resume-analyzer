const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({

  username: {
    type: String,
    required: [true, "User name is required"],
  },

  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },

  password: {
    type: String,
    required: [true, "Password field is mandatory"],
    minlength: [6, "Password must be atleast 6 characters long"],
    select: false,
  },

  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },

  // For forgot password feature
  securityQuestion: {
    type: String,
    required: [true, "Security question is required"],
  },

  securityAnswer: {
    type: String,
    required: [true, "Security answer is required"],
    select: false, // hide by default just like password
  },

}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);