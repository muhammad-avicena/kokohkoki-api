const express = require("express");
const { getAllFish, addFish } = require("../controller/fishController");

const router = express.Router();

router.get("/", getAllFish);
router.post("/", addFish);

module.exports = router;