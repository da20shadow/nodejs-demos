const router = require('express').Router();
const authService = require('../services/authService');

//URL: /auth
router.get('/login', (req, res) => {
    res.render('user/login');
});

router.post('/login',async (req, res) => {
    const {username, password} = req.body;

    try {
       const user = await authService.login(username, password);
    }catch (err){
        console.log('Login Error: ', err);
        return res.redirect('/login');
    }

    res.redirect('/profile');
});

router.get('/register', (req, res) => {
    res.render('user/register');
});

router.post('/register', async (req, res) => {

    const {username, password, rePassword} = req.body;

    if (password !== rePassword) {
        return res.redirect('/404');
    }

    const existingUser = await authService.getUserByUsername(username);

    if (existingUser) {
        return res.redirect('/404');
    }

    const user = await authService.register(username, password);
    console.log('user',user);

    res.redirect('/auth/login');
});

module.exports = router;