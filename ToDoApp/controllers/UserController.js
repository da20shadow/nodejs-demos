const router = require('express').Router();
const {isAuthenticated} = require('../middlewares/authMiddleware');

router.get('/profile', isAuthenticated, (req, res) => {
    const user = req.user;
    console.log('Profile: ', user);
    res.render('user/profile', {user});
});

router.get('/edit-profile', isAuthenticated, (req, res) => {
    res.render('user/edit-profile');
});

module.exports = router;
