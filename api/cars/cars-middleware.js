const carsModel = require('./cars-model');
const vinValidator = require('vin-validator');

const checkCarId = async(req, res, next) => {
  // HOKUS POKUS
  try {
    const car = await carsModel.getById(req.params.id);
    if(!car){
      res.status(404).json({ mesaj: `${req.params.id} kimliğine sahip araba bulunamadı` });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
}

const checkCarPayload = (req, res, next) => {
  // HOKUS POKUS
  try {
    const {vin,make,model,mileage} = req.body;
    if(vin === undefined) {
      res.status(400).json({ message: `vin is missing` });
    }
    else if(make === undefined) {
      res.status(400).json({ message: `make is missing` });
    }
    else if(model === undefined) {
      res.status(400).json({ message: `model is missing` });
    }
    else if(mileage === undefined) {
      res.status(400).json({ message: `mileage is missing` });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
}

const checkVinNumberValid = (req, res, next) => {
  // HOKUS POKUS
  try {
    const isValidVin = vinValidator.validate(req.body.vin);
    if(!isValidVin){
      res.status(400).json({ message: `vin ${req.body.vin} is invalid` });
    } else{
      next();
    }
  } catch (error) {
    next(error);
  }
}

const checkVinNumberUnique = async(req, res, next) => {
  // HOKUS POKUS
  try {
    const isExistVin = await carsModel.getByVinNumber(req.body.vin);
    if(isExistVin){
      res.status(400).json({ message: `vin ${req.body.vin} already exists` });
    } else{
      next();
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}
