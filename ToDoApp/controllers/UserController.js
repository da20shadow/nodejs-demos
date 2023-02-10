const router = require('express').Router();

router.get('/profile', (req, res) => {
    const user = req.user;
    console.log('Profile: ', user);
    res.render('user/profile',{user});
});

router.get('/edit-profile', (req, res) => {
    res.render('user/edit-profile');
});

module.exports = router;
