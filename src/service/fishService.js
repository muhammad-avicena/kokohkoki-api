const StandardError = require("../utils/constant/standardError");

class FishService {
  constructor(fishDao) {
    this.fishDao = fishDao;
  }

  async getAllFish({ sort }) {
    try {
      const sortOptions = {};

      if (sort === "asc") {
        sortOptions.createdDate = 1;
      } else if (sort === "desc") {
        sortOptions.createdDate = -1;
      } else {
        sortOptions.createdDate = 1;
      }

      const fish = await this.fishDao.findAllFish({ sortOptions });

      if (fish.length === 0) {
        throw new StandardError({
          success: false,
          message: "Fish not found or empty list",
          status: 404,
        });
      }

      if (!fish) {
        throw new StandardError({
          success: false,
          message:
            "Can't find list of fish. Please try again or contact developer",
          status: 404,
        });
      } else {
        return {
          success: true,
          message: "List of all fish",
          data: fish,
          status: 200,
        };
      }
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

      const defaultSort = "asc";

      const allowedSort = ["asc", "desc"];
      const selectedSort = allowedSort.includes(sort) ? sort : defaultSort;

      const sortOptions = {};
      if (selectedSort === "asc") {
        sortOptions.createdDate = 1;
      } else if (selectedSort === "desc") {
        sortOptions.createdDate = -1;
      } else {
        throw new StandardError({
          success: false,
          message: "Invalid sort parameter. Only asc or desc sort are allowed.",
          status: 400,
        });
      }

      const fish = await this.fishDao.findByGenderAndSort({
        gender,
        sortOptions,
      });

      if (fish.length === 0) {
        throw new StandardError({
          success: false,
          message: "Fish not found or empty list",
          status: 404,
        });
      }

      if (!fish) {
        throw new StandardError({
          success: false,
          message:
            "Can't find a fish by gender. Please try again or contact developer",
          status: 404,
        });
      } else {
        return {
          success: true,
          message: "List of fish by gender",
          data: fish,
          status: 200,
        };
      }
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
      } else {
        return {
          success: true,
          message: "Successfully found a fish",
          data: fish,
          status: 200,
        };
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

  async getFishByEvent({ isEvent, sort }) {
    const defaultSort = "asc";

    const allowedSort = ["asc", "desc"];
    const selectedSort = allowedSort.includes(sort) ? sort : defaultSort;

    const sortOptions = {};
    if (selectedSort === "asc") {
      sortOptions.createdDate = 1;
    } else if (selectedSort === "desc") {
      sortOptions.createdDate = -1;
    } else {
      throw new StandardError({
        success: false,
        message: "Invalid sort parameter. Only asc or desc sort are allowed.",
        status: 400,
      });
    }

    try {
      const fish = await this.fishDao.findByEvent({ isEvent, sortOptions });
      if (!fish) {
        throw new StandardError({
          success: false,
          message:
            "Can't find a fish by Event. Please try again or contact developer",
          status: 404,
        });
      } else {
        return {
          success: true,
          message: "List of fish by Event",
          data: fish,
          status: 200,
        };
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

  async getFishByNewArrival({ isNewArrival, sort }) {
    const defaultSort = "asc";

    const allowedSort = ["asc", "desc"];
    const selectedSort = allowedSort.includes(sort) ? sort : defaultSort;

    const sortOptions = {};
    if (selectedSort === "asc") {
      sortOptions.createdDate = 1;
    } else if (selectedSort === "desc") {
      sortOptions.createdDate = -1;
    } else {
      throw new StandardError({
        success: false,
        message: "Invalid sort parameter. Only asc or desc sort are allowed.",
        status: 400,
      });
    }

    try {
      const fish = await this.fishDao.findByNewArrival({
        isNewArrival,
        sortOptions,
      });
      if (!fish) {
        throw new StandardError({
          success: false,
          message:
            "Can't find a fish by New Arrival. Please try again or contact developer",
          status: 404,
        });
      } else {
        return {
          success: true,
          message: "List of fish by New Arrival",
          data: fish,
          status: 200,
        };
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

  async getFishByType({ type, sort }) {
    try {
      const defaultSort = "asc";

      const allowedSort = ["asc", "desc"];
      const selectedSort = allowedSort.includes(sort) ? sort : defaultSort;

      const sortOptions = {};
      if (selectedSort === "asc") {
        sortOptions.createdDate = 1;
      } else if (selectedSort === "desc") {
        sortOptions.createdDate = -1;
      } else {
        throw new StandardError({
          success: false,
          message: "Invalid sort parameter. Only asc or desc sort are allowed.",
          status: 400,
        });
      }

      const fish = await this.fishDao.findByTypeAndSort({
        type,
        sortOptions,
      });

      if (fish.length === 0) {
        throw new StandardError({
          success: false,
          message: "Fish not found or empty list",
          status: 404,
        });
      }
      if (!fish) {
        throw new StandardError({
          success: false,
          message:
            "Can't find a fish by type. Please try again or contact developer",
          status: 404,
        });
      } else {
        return {
          success: true,
          message: "List of fish by type",
          data: fish,
          status: 200,
        };
      }
    } catch (err) {
      console.log(err);
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
    isEvent,
    isNewArrival,
    isAvailable,
  }) {
    try {
      const allowedGender = ["male", "female"];
      if (!allowedGender.includes(gender)) {
        throw new StandardError({
          success: false,
          message: "Only male or female gender are allowed. Please try again",
          status: 400,
        });
      }

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
        isEvent,
        isNewArrival,
        isAvailable,
      });

      if (!fish) {
        throw new StandardError({
          success: false,
          message: "Cannot add fish. Please try again or contact developer.",
          status: 500,
        });
      } else {
        return {
          success: true,
          message: "Successfully added a fish.",
          data: { _id: fish.insertedId },
          status: 201,
        };
      }
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
    isEvent,
    isNewArrival,
    isAvailable,
  }) {
    try {
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
        isEvent,
        isNewArrival,
        isAvailable,
      });

      if (!fish) {
        throw new StandardError({
          success: false,
          message: "Invalid data input. Please try again.",
          status: 400,
        });
      } else {
        return {
          success: true,
          message: "Successfully updated a fish.",
          data: fish,
          status: 200,
        };
      }
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
      } else {
        return {
          success: true,
          message: "Successfully deleted a fish.",
          data: fish,
          status: 200,
        };
      }
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
