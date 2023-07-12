const express = require("express");
const router = express.Router();
const { postActivities,  getActivities } = require("../controllers/ActivityController");

router.post("/", postActivities);
router.get("/", getActivities);

module.exports = router;
