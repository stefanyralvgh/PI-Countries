const { Router } = require('express');
const Countries = require ('./countriesRts');
const Activities = require('./activitiesRts');


const router = Router();

router.use('/countries', Countries);
router.use('/activities', Activities);






module.exports = router;
