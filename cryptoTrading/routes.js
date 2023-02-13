const router = require('express').Router();
const authController = require('./controllers/AuthController');
const homeController = require('./controllers/HomeController');

router.use('/auth', authController);
router.use(homeController);

module.exports = router;