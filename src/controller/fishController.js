const FishDao = require("../dao/fishDao");
const FishService = require("../service/fishService");

async function getAllFish(req, res, next) {
  const { db } = req;
  const fishDao = new FishDao(db);

  try {
    const fishService = new FishService(fishDao);
    const result = await fishService.getAllFish();
    if (result.success) {
      return res.status(result.status).json({
        success: true,
        message: result.message,
        data: result.data,
      });
    } else {
      return res.status(result.status).json({
        success: false,
        message: result.message,
      });
    }
  } catch (err) {
    next(err);
  } finally {
    fishDao.closeConnection();
  }
}

async function addFish(req, res, next) {
  const { name, type, price, gender, size, desc, images, videoURLs, isAvailable } = req.body;
  const { db } = req;
  const fishDao = new FishDao(db);

  try {
    const fishService = new FishService(fishDao);
    const result = await fishService.addFish({
      name,
      type,
      price,
      gender,
      size,
      desc,
      images,
      videoURLs,
      isAvailable
    });

    if (result.success) {
      return res.status(result.status).json({
        success: true,
        message: result.message,
        data: { _id: result.data },
      });
    } else {
      return res.status(result.status).json({
        success: false,
        message: result.message,
      });
    }
  } catch (err) {
    next(err);
  } finally {
    fishDao.closeConnection();
  }
}

module.exports = {
  getAllFish,
  addFish,
};
