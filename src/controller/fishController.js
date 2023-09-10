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

module.exports = {
  getAllFish,
};
