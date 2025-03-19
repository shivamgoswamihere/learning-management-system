const express = require("express");
const { getAdminStats } = require("../controllers/adminController");

const router = express.Router();

// Admin Stats Route
router.get("/stats", getAdminStats);

module.exports = router;
