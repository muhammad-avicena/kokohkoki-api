const AuthDao = require("../dao/authDao");
const AuthService = require("../service/authService");

async function loginUser(req, res, next) {
  const { username, password } = req.body;
  const { db } = req;
  const authDao = new AuthDao(db);

  try {
    const authService = new AuthService(authDao);
    const result = await authService.loginUser({ username, password });
    if (result.success) {
      return res.status(result.status).json({
        success: true,
        message: result.message,
        data: result.data,
      });
    } else {
      return res.status(result.status).json({
        success: false,
        message: result.message,
      });
    }
  } catch (err) {
    next(err);
  } finally {
    authDao.closeConnection();
  }
}

async function registerUser(req, res, next) {
  const { username, password } = req.body;
  const { db } = req;
  const authDao = new AuthDao(db);

  try {
    const authService = new AuthService(authDao);
    const result = await authService.registerUser({ username, password });
    if (result.success) {
      return res.status(result.status).json({
        success: true,
        message: result.message,
        data: { _id: result.data },
      });
    } else {
      return res.status(result.status).json({
        success: false,
        message: result.message,
      });
    }
  } catch (err) {
    next(err);
  } finally {
    authDao.closeConnection();
  }
}

module.exports = {
  loginUser,
  registerUser,
};
