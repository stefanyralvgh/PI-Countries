const express = require('express');
const router = express.Router();
const { getAllCountries, getCountryById, getCountryByName } = require('../controllers/CountryController');

router.get('/', getAllCountries);
router.get('/:idPais', getCountryById);
router.get('/name', getCountryByName);

module.exports = router;