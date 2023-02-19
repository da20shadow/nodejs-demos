const router = require('express').Router();
const authService = require('../services/authService');
const {getThrowErrorMessage} = require('../constants/errorMessages');
const {isAuthenticated} = require('../middlewares/authMiddleware');

// URL path: /auth
router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', async (req, res) => {
    const {username, password} = req.body;
    try {
        const token = await authService.login(username, password);
        res.cookie('token', token, {httpOnly: true});
    } catch (err) {
        return res.status(400).render('auth/login', {error: getThrowErrorMessage(err)});
    }
    res.redirect('/');
});

router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', async (req, res) => {
    const {username, email, password, rePassword} = req.body;
    try {
        await authService.register(username, email, password, rePassword);
    } catch (err) {
        return res.status(400)
            .render('auth/register', {error: getThrowErrorMessage(err)})
    }
    res.redirect('/auth/login');
});

router.get('/logout', isAuthenticated, (req, res) => {
    res.clearCookie('token');
    res.redirect('/auth/login');
});

module.exports = router;