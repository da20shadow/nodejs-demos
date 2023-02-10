const router = require('express').Router();
const authService = require('../services/authService');

//URL: /auth
router.get('/login', (req, res) => {
    res.render('user/login');
});

router.post('/login', async (req, res) => {
    const {username, password} = req.body;

    try {
        const token = await authService.login(username, password);
        res.cookie('auth', token, {httpOnly: true});
    } catch (err) {
        console.log('Login Error: ', err);
        return res.redirect('/login');
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

module.exports = router;