const express = require("express");
const AuthController = require("../controllers/auth.controller");
const router = express.Router();


// router.get("/:id", () => {}); // Show Registered User Details

router.post("/", AuthController.loginUser); // Login

module.exports = router;