const router = require('express').Router();
const {authController,staticPagesController,petsController,userController} = require('./controllers');

//Paths login, register, logout
router.use('/auth', authController);

router.use('/users', userController);

router.use('/pets', petsController);

//Paths: /, about etc.
router.use('/', staticPagesController);

router.all('*', (req,res) => {
    res.render('staticPages/404')
})
module.exports = router;