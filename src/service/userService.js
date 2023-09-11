const StandardError = require("../utils/constant/standardError");

class UserService {
  constructor(userDao) {
    this.userDao = userDao;
  }

  async getAllUser() {
    try {
      const user = await this.userDao.getListUser();
      if (!user) {
        throw new StandardError({
          success: false,
          message: "No user found.",
          status: 404,
        });
      }
      return { status: 200, message: "List of all user", data: user };
    } catch (err) {
      console.log(err);
      throw new StandardError({
        success: false,
        status: err.status,
        message: err.message,
      });
    }
  }

  async updateRole({ id, role }) {
    try {
      const allowedRoles = ["admin", "member"];
      if (!allowedRoles.includes(role)) {
        throw new StandardError({
          status: 400,
          message: "Failed to update role. Invalid role specified",
        });
      }

      const user = await this.userDao.updateRole({ id, role });

      if (!user) {
        throw new StandardError({
          success: false,
          message: "User not found.",
          status: 404,
        });
      }
      return {
        status: 200,
        success: true,
        message: "Successfully update user role",
        data: user,
      };
    } catch (err) {
      console.log(err);
      throw new StandardError({
        success: false,
        status: err.status,
        message: err.message,
      });
    }
  }
}

module.exports = UserService;
