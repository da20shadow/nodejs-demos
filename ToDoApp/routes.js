const router = require('express').Router();
const authController = require('./controllers/AuthController');
const userController = require('./controllers/UserController');
const taskController = require('./controllers/TaskController');
const staticPageController = require('./controllers/StaticPageController');
const {isAuthenticated} = require('./middlewares/authMiddleware');
const {handleRequest} = require("./utils/handleRequest");

//Auth
router.use('/auth', authController);

//Users CRUD
router.get('/users/profile',isAuthenticated,handleRequest(userController.getProfilePage));
router.get('/users/edit-profile',isAuthenticated,handleRequest(userController.getEditProfilePage));
router.post('/users/edit-profile',isAuthenticated,handleRequest(userController.postEditProfilePage));

//Tasks CRUD
router.use('/tasks',taskController);

router.get('/404',(req, res) => {
    res.render('pages/404');
});

//Home,About etc
router.use('/',staticPageController);

module.exports = router;