const { format } = require("date-fns");
const StandardError = require("../utils/constant/standardError");

class FishDao {
  constructor(db) {
    this.db = db;
  }

  async getAllFish() {
    const fish = await this.db
      .collection("fishes")
      .find({ isDeleted: { $exists: false } })
      .toArray();
    return fish;
  }

  async createFish({
    name,
    type,
    price,
    gender,
    size,
    desc,
    images,
    videoURLs,
    isAvailable,
  }) {
    const newDate = new Date();
    const createdDate = format(newDate, "yyyy-MM-dd hh:mm");

    const fishData = {
      name,
      type,
      price,
      gender,
      size,
      desc,
      images,
      videoURLs,
      isAvailable,
      createdDate,
    };

    const isNameTaken = await this.db.collection("fishes").findOne({ name });
    if (isNameTaken) {
      throw new StandardError({
        success: false,
        message: `The fish name "${name}" is not available. Please try another`,
        status: 409,
      });
    }

    const fish = await this.db.collection("fishes").insertOne(fishData);
    return fish;
  }

  async findByName({ name }) {
    const fish = await this.db
      .collection("fishes")
      .findOne({ name, isDeleted: { $exists: false } });
    return fish;
  }

  async closeConnection() {
    await this.db.client.close();
  }
}

module.exports = FishDao;
