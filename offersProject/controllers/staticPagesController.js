const router = require('express').Router();

// URL path: /
router.get('/404', (req, res) => {
    res.render('staticPages/404');
});

router.get('/', (req, res) => {
    res.render('staticPages/home');
});

module.exports = router;