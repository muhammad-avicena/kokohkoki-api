const StandardError = require("../utils/constant/standardError");

class FishService {
  constructor(fishDao) {
    this.fishDao = fishDao;
  }

  async getAllFish({ sort }) {
    try {
      const sortOptions = {};

      // Sort by creation date in ascending or descending order
      if (sort === "asc") {
        sortOptions.createdDate = 1;
      } else if (sort === "desc") {
        sortOptions.createdDate = -1;
      } else {
        // Default to ascending order if no valid sort option is provided
        sortOptions.createdDate = 1;
      }

      const fish = await this.fishDao.findAllFish({ sortOptions });

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
      console.log(err);
      throw new StandardError({
        success: false,
        status: err.status,
        message: err.message,
      });
    }
  }

  async getFishByGender({ gender, sort }) {
    try {
      const allowedGender = ["male", "female"];
      if (!allowedGender.includes(gender)) {
        throw new StandardError({
          success: false,
          message: "Only male or female gender are allowed. Please try again",
          status: 400,
        });
      }

      const allowedSort = ["male", "female"];
      if (!allowedSort.includes(sort)) {
        throw new StandardError({
          success: false,
          message: "Only asc or desc sort are allowed. Please try again",
          status: 400,
        });
      }

      const sortOptions = {};
      if (sort === "asc") {
        sortOptions.createdDate = 1;
      } else if (sort === "desc") {
        sortOptions.createdDate = -1;
      } else {
        sortOptions.createdDate = 1;
      }

      const fish = await this.fishDao.findByGenderAndSort({
        gender,
        sortOptions,
      });

      if (!fish) {
        throw new StandardError({
          success: false,
          message: "Fish not found.",
          status: 404,
        });
      }

      return {
        success: true,
        message: "List of fish by gender",
        data: fish,
        status: 200,
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

  async getFishByName({ name }) {
    try {
      const regexName = new RegExp(name, "i");
      const fish = await this.fishDao.findByName({
        name: { $regex: regexName },
      });
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
    image1,
    image2,
    image3,
    videoURL,
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
        image1,
        image2,
        image3,
        videoURL,
        isAvailable,
      });

      const allowedGender = ["male", "female"];
      if (!allowedGender.includes(gender)) {
        throw new StandardError({
          success: false,
          message: "Only male or female gender are allowed. Please try again",
          status: 400,
        });
      }

      if (!fish) {
        throw new StandardError({
          success: false,
          message: "Cannot add fish. Please try again or contact developer.",
          status: 500,
        });
      }

      return {
        success: true,
        message: "Successfully added a fish.",
        data: { _id: fish.insertedId },
        status: 201,
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
        image1,
        image2,
        image3,
        videoURL,
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
      console.log(err);
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
      console.log(err);
      throw new StandardError({
        success: false,
        status: err.status,
        message: err.message,
      });
    }
  }
}

module.exports = FishService;
