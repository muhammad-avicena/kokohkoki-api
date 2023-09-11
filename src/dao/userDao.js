const StandardError = require("../utils/constant/standardError");
const { ObjectId } = require("mongodb");

class UserDao {
  constructor(db) {
    this.db = db;
  }

  async getListUser() {
    const user = await this.db
      .collection("users")
      .find({ isDeleted: { $exists: false } })
      .toArray();
    return user;
  }

  async updateRole({ id, role }) {
    const objectId = new ObjectId(id);

    await this.db.collection("users").findOneAndUpdate(
      { _id: objectId },
      {
        $set: { role: role },
      }
    );

    const getLatestUser = await this.db
      .collection("users")
      .findOne({ _id: objectId });

    return getLatestUser;
  }

  async closeConnection() {
    await this.db.client.close();
  }
}

module.exports = UserDao;
