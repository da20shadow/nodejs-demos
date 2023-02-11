const router = require('express').Router();
const authService = require('../services/authService');
const {isValidEmail,isValidUsername} = require('../utils/validators');

//URL: /auth
router.get('/login', (req, res) => {
    res.render('user/login');
});

router.post('/login', async (req, res) => {
    const {username, password} = req.body;

    if (!isValidUsername(username)){
        return res.render('user/login',{
            error:'Username must be between 3 and 45 characters! And can contains only letters digits and underscore'
        });
    }

    try {
        const token = await authService.login(username, password);
        res.cookie('auth', token, {httpOnly: true});
    } catch (err) {
        console.log('Login Error: ', err);
        return res.redirect('/auth/login');
    }
    console.log('Login POST: ', username)
    res.redirect('/users/profile');
});

router.get('/register', (req, res) => {
    res.render('user/register');
});

router.post('/register', async (req, res) => {

    const {username, email, password, rePassword} = req.body;

    if (!username || !email || !password || !rePassword) {
        return res.redirect('/404');
    }

    if (password !== rePassword) {
        return res.redirect('/404');
    }

    const existingUser = await authService.getUserByUsername(username);

    if (existingUser) {
        return res.redirect('/404');
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