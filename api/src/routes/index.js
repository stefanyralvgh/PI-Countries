const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const getCountries = require('../controllers/getCountries');
const activitiesCtrl = require('../controllers/activitiesCtrl');


const router = Router();

router.use('/countries', getCountries );
// router.use('/activities', activitiesCtrl );


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
