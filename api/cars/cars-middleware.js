const carsModel = require('./cars-model');
const vinValidator = require('vin-validator');

const checkCarId = async(req, res, next) => {
  // HOKUS POKUS
  try {
    const car = await carsModel.getById(req.params.id);
    if(!car){
      res.status(404).json({ mesaj: `${req.params.id} kimliğine sahip araba bulunamadı` });
    } else {
      res.car = car;
      next();
    }
  } catch (error) {
    next(error);
  }
}

const checkCarPayload = (req, res, next) => {
  // HOKUS POKUS
  try {
    const {vin,make,model,milage} = req.body;
    if(vin === undefined) {
      res.status(400).json({ mesaj: `vin eksik` });
    }
    else if(make === undefined) {
      res.status(400).json({ mesaj: `make eksik` });
    }
    else if(model === undefined) {
      res.status(400).json({ mesaj: `model eksik` });
    }
    else if(milage === undefined) {
      res.status(400).json({ mesaj: `milage eksik` });
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
      res.status(400).json({ mesaj: `vin ${req.body.vin} geçersizdir` });
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
      res.status(400).json({ mesaj: `vin ${req.body.vin} zaten var` });
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
