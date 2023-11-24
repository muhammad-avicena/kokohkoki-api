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
  const { sort } = req.query;
  await handleRequest(req, res, next, (fishService) =>
    fishService.getAllFish({ sort })
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

async function getFishByEvent(req, res, next) {
  const { sort } = req.query;
  await handleRequest(req, res, next, (fishService) =>
    fishService.getFishByEvent({ sort })
  );
}

async function getFishByNewArrival(req, res, next) {
  const { sort } = req.query;
  await handleRequest(req, res, next, (fishService) =>
    fishService.getFishByNewArrival({ sort })
  );
}

async function getFishByGender(req, res, next) {
  const { gender, sort } = req.query;
  await handleRequest(req, res, next, (fishService) =>
    fishService.getFishByGender({ gender, sort })
  );
}

async function getFishByType(req, res, next) {
  const { type, sort } = req.query;
  await handleRequest(req, res, next, (fishService) =>
    fishService.getFishByType({ type, sort })
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
  const { id } = req.params;
  await handleRequest(req, res, next, (fishService, req) =>
    fishService.deleteFish({ id })
  );
}

module.exports = {
  getAllFish,
  addFish,
  getFishByName,
  getFishByGender,
  getFishByType,
  updateFish,
  deleteFish,
  getFishByEvent,
  getFishByNewArrival,
};
