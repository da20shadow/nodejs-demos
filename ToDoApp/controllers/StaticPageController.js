const router = require('express').Router();

//URL /
router.get('',(req, res) => {
    res.render('pages/home');
});

module.exports = router;