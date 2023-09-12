const { format } = require("date-fns");
const StandardError = require("../utils/constant/standardError");
const { ObjectId } = require("mongodb");

class FishDao {
  constructor(db) {
    this.db = db;
  }

  async findAllFish({ sortOptions }) {
    const fish = await this.db
      .collection("fishes")
      .find({ isDeleted: { $exists: false } })
      .sort(sortOptions)
      .toArray();
    return fish;
  }

  async findByName({ name }) {
    try {
      const fish = await this.db
        .collection("fishes")
        .findOne({ name, isDeleted: { $exists: false } });
      return fish;
    } catch (err) {
      console.log(err.message);
      throw new StandardError({
        success: false,
        status: err.status,
        message: err.message,
      });
    }
  }

  async findByGenderAndSort({ gender, sortOptions }) {
    try {
      const fish = await this.db
        .collection("fishes")
        .find({ gender, isDeleted: { $exists: false } })
        .sort(sortOptions)
        .toArray();
      return fish;
    } catch (err) {
      console.log(err.message);
      throw new StandardError({
        success: false,
        status: err.status,
        message: err.message,
      });
    }
  }

  async createFish({
    name,
    type,
    price,
    gender,
    size,
    desc,
    image1,
    image2,
    image3,
    videoURL,
    isAvailable,
  }) {
    const newDate = new Date();
    const createdDate = format(newDate, "yyyy-MM-dd hh:mm");

    const images = {
      image1,
      image2,
      image3,
    };

    const fishData = {
      name,
      type,
      price,
      gender,
      size,
      desc,
      images,
      videoURL,
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

  async updateFish({
    id,
    name,
    type,
    price,
    gender,
    size,
    desc,
    image1,
    image2,
    image3,
    videoURL,
    isAvailable,
  }) {
    const objectId = new ObjectId(id);

    const updateObject = {};
    if (name !== undefined) updateObject.name = name;
    if (type !== undefined) updateObject.type = type;
    if (price !== undefined) updateObject.price = price;
    if (gender !== undefined) updateObject.gender = gender;
    if (size !== undefined) updateObject.size = size;
    if (desc !== undefined) updateObject.desc = desc;
    if (image1 !== undefined || image2 !== undefined || image3 !== undefined) {
      updateObject.images = {
        image1,
        image2,
        image3,
      };
    }
    if (videoURL !== undefined) updateObject.videoURLs = videoURL;
    if (isAvailable !== undefined) updateObject.isAvailable = isAvailable;

    const updateFish = await this.db.collection("fishes").findOneAndUpdate(
      { _id: objectId },
      {
        $set: updateObject,
      }
    );

    const getFishLatestData = await this.db
      .collection("fishes")
      .findOne({ _id: objectId });

    if (updateFish && getFishLatestData) {
      const result = {
        oldVersion: updateFish,
        updatedVersion: getFishLatestData,
      };
      return result;
    } else {
      throw new StandardError({
        success: false,
        message: "Fish not found.",
        status: 404,
      });
    }
  }

  async deleteFish({ id }) {
    const objectId = new ObjectId(id);
    const updateFish = await this.db
      .collection("fishes")
      .findOneAndDelete({ _id: objectId });
    return updateFish;
  }

  async closeConnection() {
    await this.db.client.close();
  }
}

module.exports = FishDao;
