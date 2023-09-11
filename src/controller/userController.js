const UserDao = require("../dao/userDao");
const UserService = require("../service/userService");

function sendResponse(res, result) {
  return res.status(result.status).json({
    success: result.success,
    message: result.message,
    data: result.data,
  });
}

async function handleRequest(req, res, next, serviceFunction) {
  const { db } = req;
  const userDao = new UserDao(db);

  try {
    const userService = new UserService(userDao);
    const result = await serviceFunction(userService, req);
    sendResponse(res, result);
  } catch (err) {
    next(err);
  } finally {
    userDao.closeConnection();
  }
}

async function getAllUser(req, res, next) {
  await handleRequest(req, res, next, (userService) =>
    userService.getAllUser()
  );
}

async function updateRole(req, res, next) {
  const { id } = req.params;
  const { role } = req.body;
  const userData = {
    id,
    role,
  };
  await handleRequest(req, res, next, (userService) =>
    userService.updateRole(userData)
  );
}

module.exports = {
  getAllUser,
  updateRole,
};
