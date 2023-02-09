const router = require('express').Router();
const authService = require('../services/authService');

//URL /auth/login
router.get('/login', (req, res) => {

    res.render('user/login');
});

router.get('/register', async (req, res) => {

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

    res.redirect('user/login');
});

module.exports = router;