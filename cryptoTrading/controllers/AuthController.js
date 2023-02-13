const router = require('express').Router();
const authService = require('../services/authService');

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', async (req, res) => {

    const {email, password} = req.body;

    try {
        const token = await authService.login(email, password);
        res.cookie('auth', token, {httpOnly: true});
    } catch (err) {
        console.log(err);
        return res.render('auth/login', {error: err.message});
    }


    res.redirect('/');
});

router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', async (req, res) => {

    const {username, email, password, repeatPassword} = req.body;

    try {
        await authService.register(username, email, password, repeatPassword);
    } catch (err) {
        let error = err.message;
        if (err.errors) {
            if (err.errors.username) {
                error = err.errors.username.message;
            } else if (err.errors.email) {
                error = err.errors.email.message;
            } else if (err.errors.password) {
                error = err.errors.password.message;
            }
        }
        return res.render('auth/register', {error});
    }

    res.redirect('login');
});

module.exports = router;