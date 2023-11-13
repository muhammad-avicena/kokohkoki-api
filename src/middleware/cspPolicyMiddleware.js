const cspPolicyMiddleware = (app) => {
  app.use((req, res, next) => {
    res.setHeader(
      "Content-Security-Policy",
      "script-src 'self' https://avicena.dev"
    );
    next();
  });
};

module.exports = cspPolicyMiddleware;
