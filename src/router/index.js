const express = require("express");
const authRouter = require("./authRoutes");
const userRouter = require("./userRoutes");
const fishRouter = require("./fishRoutes");

const router = express.Router();

router.use("/api/v1/auth", authRouter);
router.use("/api/v1/fish", fishRouter);
router.use("/api/v1/user", userRouter);

module.exports = router;
