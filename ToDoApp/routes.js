const router = require('express').Router();
const authController = require('./controllers/AuthController');
const taskController = require('./controllers/TaskController');
const staticPageController = require('./controllers/StaticPageController');

//Auth
router.use('/auth', authController);

//Users CRUD
// router.use('/users',userController);

//Tasks CRUD
router.use('/tasks',taskController);

//Home,About etc
router.use('/',staticPageController);

module.exports = router;