const FishDao = require("../dao/fishDao");
const FishService = require("../service/fishService");

function sendResponse(res, result) {
  return res.status(result.status).json({
    success: result.success,
    message: result.message,
    data: result.data,
  });
}

async function handleRequest(req, res, next, serviceFunction) {
  const { db } = req;
  const fishDao = new FishDao(db);

  try {
    const fishService = new FishService(fishDao);
    const result = await serviceFunction(fishService, req);
    sendResponse(res, result);
  } catch (err) {
    next(err);
  } finally {
    fishDao.closeConnection();
  }
}

async function getAllFish(req, res, next) {
  await handleRequest(req, res, next, (fishService) =>
    fishService.getAllFish()
  );
}

async function addFish(req, res, next) {
  await handleRequest(req, res, next, (fishService, req) =>
    fishService.addFish(req.body)
  );
}

async function getFishByName(req, res, next) {
  await handleRequest(req, res, next, (fishService, req) =>
    fishService.getFishByName(req.query)
  );
}

async function updateFish(req, res, next) {
  const { id } = req.params;
  const fishData = {
    id,
    ...req.body,
  };
  await handleRequest(req, res, next, (fishService) =>
    fishService.updateFish(fishData)
  );
}

async function deleteFish(req, res, next) {
  await handleRequest(req, res, next, (fishService, req) =>
    fishService.deleteFish(req.params)
  );
}

module.exports = {
  getAllFish,
  addFish,
  getFishByName,
  updateFish,
  deleteFish,
};
