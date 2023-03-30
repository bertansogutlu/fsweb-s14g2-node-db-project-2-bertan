// HOKUS POKUS
const express = require("express");
const router = express.Router();
const middleware = require("./cars-middleware");
const carModel = require("./cars-model");

router.get("/", async (req, res, next) => {
  try {
    const allCars = carModel.getAll();
    res.status(200).json(allCars);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", middleware.checkCarId, (req, res, next) => {
  try {
    res.status(200).json(req.car);
  } catch (error) {
    next(error);
  }
});

router.post("/", middleware.checkCarPayload, middleware.checkVinNumberValid, middleware.checkVinNumberUnique, async (req, res, next) => {
    try {
    const insertedCar = await carModel.create(req.body)
      res.status(200).json(rinsertedCar);
    } catch (error) {
      next(error);
    }
  });

module.exports = router
