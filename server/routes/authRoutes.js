const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Signup
router.post("/signup", authController.register);

// Login
router.post("/login", authController.login);

module.exports = router;
