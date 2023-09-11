const bcrypt = require("bcrypt");
const StandardError = require("../utils/constant/standardError");
const jwt = require("jsonwebtoken");
const { JWT_SIGN } = require("../config/jwtConfig.js");

class AuthService {
  constructor(authDao) {
    this.authDao = authDao;
  }

  async loginUser({ username, password }) {
    try {
      const user = await this.authDao.findByUsername({ username, password });
      if (!user) {
        throw new StandardError({
          success: false,
          message: "Incorrect username or password. Please try again.",
          status: 401,
        });
      }
      const expirationTime = 60 * 60 * 24;
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (isPasswordCorrect) {
        const token = jwt.sign(
          {
            id: user._id,
            username: user.username,
            role: user.role,
          },
          JWT_SIGN,
          { expiresIn: expirationTime }
        );
        return {
          success: true,
          message: "Successfully logged in",
          data: { token },
          status: 200,
        };
      } else {
        throw new StandardError({
          success: false,
          message: "Incorrect username or password. Please try again.",
          status: 401,
        });
      }
    } catch (err) {
      console.log(err.message);
      throw new StandardError({
        success: false,
        status: err.status,
        message: err.message,
      });
    }
  }

  async registerUser({ username, password }) {
    try {
      if (!username || !password) {
        throw new StandardError({
          success: false,
          message: "Invalid input data. Please try again.",
          status: 400,
        });
      }

      if (username.trim().length === 0 || username.length <= 6) {
        throw new StandardError({
          success: false,
          message:
            "Username should have minimum 6 characters and cannot be blank. Please try again.",
          status: 400,
        });
      }

      if (password.length >= 8 && /^(?=.*[a-zA-Z])(?=.*[0-9])/.test(password)) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await this.authDao.createUser({
          username,
          password: hashedPassword,
        });
        return {
          success: true,
          message: "Successfully registered a user",
          data: { _id: user.insertedId },
          status: 201,
        };
      } else {
        throw new StandardError({
          success: false,
          message:
            "Password should be at least 8 characters and contain number. Please try again.",
          status: 400,
        });
      }
    } catch (err) {
      console.log(err.message);
      throw new StandardError({
        success: false,
        status: err.status,
        message: err.message,
      });
    }
  }
}

module.exports = AuthService;
