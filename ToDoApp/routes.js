const router = require('express').Router();
const authController = require('./controllers/AuthController');
const userController = require('./controllers/UserController');
const taskController = require('./controllers/TaskController');
const staticPageController = require('./controllers/StaticPageController');

//Auth
router.use('/auth', authController);

//Users CRUD
router.use('/users',userController);

//Tasks CRUD
router.use('/tasks',taskController);

router.get('/404',(req, res) => {
    res.render('pages/404');
});

//Home,About etc
router.use('/',staticPageController);

module.exports = router;