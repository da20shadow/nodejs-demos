const router = require('express').Router();

//URL /tasks
router.get('',(req, res) => {

    res.render('tasks/allTasks');
});

module.exports = router;