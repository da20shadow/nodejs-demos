const router = require('express').Router();
const {isAuthenticated} = require('../middlewares/authMiddleware');

//URL /tasks
router.get('', isAuthenticated, (req, res) => {
    if (!req.user) {
        return res.redirect('/404');
    }
    res.render('tasks/allTasks');
});

router.get('/add', isAuthenticated, (req, res) => {
    if (!req.user) {
        return res.redirect('/404');
    }
    res.render('tasks/create');
});

router.post('/add', isAuthenticated, async (req, res) => {


    const {title, dueDate} = req.body;

    res.redirect('/tasks');
});

module.exports = router;