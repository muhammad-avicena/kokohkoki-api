const express = require("express");
const {
  getAllFish,
  addFish,
  getFishByName,
  getFishByGender,
  getFishByType,
  getFishByEvent,
  getFishByNewArrival,
  updateFish,
  deleteFish,
} = require("../controller/fishController");
const { adminAuthorization } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const { name, gender, type, isEvent, isNewArrival, sort } = req.query;

  if (name) {
    await getFishByName(req, res, next);
  } else if ((gender && sort) || gender) {
    await getFishByGender(req, res, next);
  } else if ((type && sort) || type) {
    await getFishByType(req, res, next);
  } else if ((isEvent && sort) || isEvent) {
    await getFishByEvent(req, res, next);
  } else if ((isNewArrival && sort) || isNewArrival) {
    await getFishByNewArrival(req, res, next);
  } else {
    await getAllFish(req, res, next);
  }
});

router.post("/", adminAuthorization, addFish);
router.put("/:id", adminAuthorization, updateFish);
router.delete("/:id", adminAuthorization, deleteFish);

module.exports = router;
