const express = require("express");
const {
  getAllFish,
  addFish,
  getFishByName,
  updateFish,
} = require("../controller/fishController");
const { adminAuthorization } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", (req, res, next) => {
  if (req.query.name) {
    getFishByName(req, res, next);
  } else {
    getAllFish(req, res, next);
  }
});
router.post("/", adminAuthorization, addFish);
router.put("/:id", adminAuthorization, updateFish);

module.exports = router;
