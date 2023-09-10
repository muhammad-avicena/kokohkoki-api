require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const logger = require("morgan");
const databaseMiddleware = require("./src/middleware/databaseMiddleware");
const checkConnectionDb = require("./src/db/database");
const errorHandlerMiddleware = require("./src/middleware/errorHandlerMiddleware");

// Import router files
const authRouter = require("./src/router/authRoutes");

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(cors());
app.use(databaseMiddleware);

// Routes
app.use("/api/v1/auth", authRouter);

// Error handler middleware
app.use(errorHandlerMiddleware);

// App listeners
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  checkConnectionDb();
});
