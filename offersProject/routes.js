const router = require('express').Router();
const {authController,staticPagesController,offersController} = require('./controllers');

//Paths login, register, logout
router.use('/auth', authController);

//TODO: change controller name and path!
router.use('/offers', offersController);

//Paths: /, 404, about etc.
router.use('/', staticPagesController);

module.exports = router;