require("dotenv").config();
const express = require("express");
const useMiddleware = require("./src/middleware");
const routes = require("./src/router");
const createError = require("http-errors");
const checkConnectionDb = require("./src/db/database");
const errorHandlerMiddleware = require("./src/middleware/errorHandlerMiddleware");

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
useMiddleware(app);

// Routes
app.use(routes)

// Error handler middleware
app.use(errorHandlerMiddleware);
app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.status(err.status || 500);
  res.json({ success: false, message: err.message });
});

// App listeners
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  checkConnectionDb();
});
