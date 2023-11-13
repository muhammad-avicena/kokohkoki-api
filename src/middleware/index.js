const databaseMiddleware = require("./databaseMiddleware");
const morganMiddleware = require("./morganMiddleware");
const bodyParserMiddleware = require("./bodyParserMiddleware");
const corsMiddleware = require("./corsMiddleware");
const helmetMiddleware = require("./helmetMiddleware");
const cspPolicyMiddleware = require("./cspPolicyMiddleware");

const useMiddleware = (app) => {
  corsMiddleware(app);
  helmetMiddleware(app);
  morganMiddleware(app);
  bodyParserMiddleware(app);
  cspPolicyMiddleware(app);
  app.use(databaseMiddleware);
};

module.exports = useMiddleware;
