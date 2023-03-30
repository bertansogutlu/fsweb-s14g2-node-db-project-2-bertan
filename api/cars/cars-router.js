// HOKUS POKUS
const express = require("express");
const router = express.Router();
const middleware = require("./cars-middleware");
const carsModel = require("./cars-model");

router.get("/", async (req, res, next) => {
  try {
    const allCars = await carsModel.getAll();
    res.status(200).json(allCars);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", middleware.checkCarId, async(req, res, next) => {
  try {
    const car = await carsModel.getById(req.params.id);
    res.status(200).json(car);
  } catch (error) {
    next(error);
  }
});

router.post("/", middleware.checkCarPayload, middleware.checkVinNumberValid, middleware.checkVinNumberUnique, async (req, res, next) => {
    try {
    const insertedCar = await carsModel.create(req.body)
      res.status(200).json(insertedCar);
    } catch (error) {
      next(error);
    }
  });

module.exports = router
