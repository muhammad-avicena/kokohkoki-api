const StandardError = require("../utils/constant/standardError");

class FishService {
  constructor(fishDao) {
    this.fishDao = fishDao;
  }

  async getAllFish() {
    try {
      const fish = await this.fishDao.getAllFish();

      if (!fish) {
        throw new StandardError({
          success: false,
          message: "No fish found.",
          status: 404,
        });
      }

      if (fish.length === 0) {
        return {
          success: true,
          message: "List of all fish",
          data: "Empty list.",
          status: 200,
        };
      }

      return {
        success: true,
        message: "List of all fish",
        data: fish,
        status: 200,
      };
    } catch (err) {
      console.log(err.message);
      throw new StandardError({
        success: false,
        status: err.status,
        message: err.message,
      });
    }
  }

  async addFish({
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
    try {
      const fish = await this.fishDao.createFish({
        name,
        type,
        price,
        gender,
        size,
        desc,
        images,
        videoURLs,
        isAvailable,
      });

      if (!fish) {
        throw new StandardError({
          success: false,
          message: "Cannot add fish. Please try again.",
          status: 400,
        });
      }

      return {
        success: true,
        message: "Successfully added a fish.",
        data: { _id: fish.insertedId },
        status: 201,
      };
    } catch (err) {
      console.log(err.message);
      throw new StandardError({
        success: false,
        status: err.status,
        message: err.message,
      });
    }
  }

  async getFishByName({ name }) {
    try {
      const fish = await this.fishDao.findByName({ name });
      if (!fish) {
        throw new StandardError({
          success: false,
          message: "Fish not found.",
          status: 404,
        });
      }
      return {
        success: true,
        message: "Successfully found a fish",
        data: fish,
        status: 200,
      };
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

module.exports = FishService;
