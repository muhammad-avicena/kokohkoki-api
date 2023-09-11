const StandardError = require("../utils/constant/standardError");

class FishService {
  constructor(fishDao) {
    this.fishDao = fishDao;
  }

  async getAllFish() {
    try {
      const fish = await this.fishDao.findAllFish();

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

  async updateFish({
    id,
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
      const isNameTaken = await this.fishDao.findByName({ name });
      if (isNameTaken) {
        throw new StandardError({
          success: false,
          message: `The fish name "${name}" is not available. Please try another`,
          status: 409,
        });
      }

      const fish = await this.fishDao.updateFish({
        id,
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
          message: "Invalid data input. Please try again.",
          status: 400,
        });
      }

      return {
        success: true,
        message: "Successfully updated a fish.",
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

  async deleteFish({ id }) {
    try {
      const fish = await this.fishDao.deleteFish({ id });

      if (!fish) {
        throw new StandardError({
          success: false,
          message: "Fish not found.",
          status: 404,
        });
      }

      return {
        success: true,
        message: "Successfully deleted a fish.",
        data: fish,
        status: 200,
      };
    } catch (err) {
      throw new StandardError({
        success: false,
        status: err.status,
        message: err.message,
      });
    }
  }
}

module.exports = FishService;
