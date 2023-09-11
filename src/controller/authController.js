const AuthDao = require("../dao/authDao");
const AuthService = require("../service/authService");

function sendResponse(res, result) {
  return res.status(result.status).json({
    success: result.success,
    message: result.message,
    data: result.data,
  });
}

async function handleRequest(req, res, next, serviceFunction) {
  const { db } = req;
  const authDao = new AuthDao(db);

  try {
    const authService = new AuthService(authDao);
    const result = await serviceFunction(authService, req);
    sendResponse(res, result);
  } catch (err) {
    next(err);
  } finally {
    authDao.closeConnection();
  }
}

async function loginUser(req, res, next) {
  await handleRequest(req, res, next, (authService, req) =>
    authService.loginUser(req.body)
  );
}

async function registerUser(req, res, next) {
  await handleRequest(req, res, next, (authService, req) =>
    authService.registerUser(req.body)
  );
}

module.exports = {
  loginUser,
  registerUser,
};
