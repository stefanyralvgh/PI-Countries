const express = require('express');
const router = express.Router();
const { getAllCountries, getCountryById, getCountryByName } = require('../controllers/CountryController');

router.get('/name', getCountryByName);
router.get('/', getAllCountries);
router.get('/:id', getCountryById);
// router.get('/:id/name', getCountryByName);

module.exports = router;