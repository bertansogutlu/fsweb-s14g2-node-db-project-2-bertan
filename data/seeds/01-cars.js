// ESNEK

const defaultCars = [
    {
        vin: '123',
        make: 'Mercedes',
        model: 'A180',
        mileage: '10000'
    },
    {
        vin: '124',
        make: 'Skoda',
        model: 'Fabia',
        mileage: '12000'
    },
    {
        vin: '125',
        make: 'Volkswagen',
        model: 'Golf',
        mileage: '15000'
    },
    {
        vin: '126',
        make: 'Toyota',
        model: 'Corolla',
        mileage: '20000'
    },
    {
        vin: '127',
        make: 'Subaru',
        model: 'Forester',
        mileage: '30000'
    }
]

exports.seed = async function (knex) {
    await knex('cars').truncate();
    await knex('cars').insert(defaultCars);
  };