const express = require("express");
const { getAllUser, updateRole } = require("../controller/userController");
const {
  adminAuthorization,
  managerAuthorization,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", adminAuthorization, getAllUser);
router.patch("/role/:id", managerAuthorization, updateRole);

module.exports = router;
