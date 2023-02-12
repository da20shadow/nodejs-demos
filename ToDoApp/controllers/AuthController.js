const router = require('express').Router();
const {body,query,cookie,param,header,validationResult} = require('express-validator');
const authService = require('../services/authService');
const {isValidUsername} = require('../middlewares/middlewareValidators');

//URL: /auth
router.get('/login', (req, res) => {
    res.render('user/login');
});

//isValidUsername is middleware that will validate the username
router.post('/login',isValidUsername, async (req, res) => {
    const {username, password} = req.body;

    if (!username){
        return res.render('user/login',{error: 'Username cannot be empty!'});
    }

    if (!password){
        return res.render('user/login',{error: 'Password cannot be empty!'});
    }

    try {
        const token = await authService.login(username, password);
        res.cookie('auth', token, {httpOnly: true});
    } catch (err) {
        console.log('Login Error: ', err);
        return res.render('user/login',{error: err.message});
    }
    console.log('Login POST: ', username)
    res.redirect('/users/profile');
});

router.get('/register', (req, res) => {
    res.render('user/register');
});

router.post('/register', body('email').isEmail(), async (req, res,next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        // return res.status(400).json({errors: errors.array()});
        return res.render('user/register',{errors: errors.array()})
    }

    const {username, email, password, rePassword} = req.body;

    if (!username || !email || !password || !rePassword) {
        return res.render('user/register',{error: 'All fields are required!'});
    }

    if (password !== rePassword) {
        next(new Error('Passwords does not match!'));
        return res.render('user/register',{error: 'Passwords does not match!' })
    }

    const existingUser = await authService.getUserByUsername(username);

    if (existingUser) {
        return res.render('user/register',{error:'Such user already exists!'});
    }

    const user = await authService.register(username, email, password);
    console.log('User: ', user);

    res.redirect('/auth/login');
});

router.get('/logout', (req,res) => {
    res.clearCookie('auth');
    res.redirect('/auth/login');
})

module.exports = router;