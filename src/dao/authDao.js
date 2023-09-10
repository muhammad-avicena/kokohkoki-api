const { format } = require("date-fns");
const StandardError = require("../utils/constant/standardError");

class AuthDao {
  constructor(db) {
    this.db = db;
  }

  async findByUsername({ username }) {
    const user = await this.db.collection("users").findOne({ username });
    return user;
  }

  async createUser({ username, password }) {
    const newDate = new Date();
    const createdDate = format(newDate, "yyyy-MM-dd");
    const role = "member";

    const userData = {
      username,
      password,
      role,
      createdDate,
    };

    const isUserTaken = await this.db.collection("users").findOne({ username });
    if (isUserTaken) {
      throw new StandardError({
        success: false,
        message: `the username "${username}" is not available. Please try another`,
        status: 409,
      });
    }
    const result = await this.db.collection("users").insertOne(userData);
    return result;
  }

  async closeConnection() {
    await this.db.client.close();
  }
}

module.exports = AuthDao;
