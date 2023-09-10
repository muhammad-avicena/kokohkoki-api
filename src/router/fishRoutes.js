const express = require("express");
const { getAllFish } = require("../controller/fishController");

const router = express.Router();

router.get("/", getAllFish);

module.exports = router;