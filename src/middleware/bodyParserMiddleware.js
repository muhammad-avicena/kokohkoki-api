const bodyParser = require("body-parser");

const bodyParserMiddleware = (app) => {
    app.use(bodyParser.json());
};

module.exports = bodyParserMiddleware;