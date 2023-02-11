const router = require('express').Router();
const {isAuthenticated} = require('../middlewares/authMiddleware');
const taskService = require('../services/taskService');
const {log} = require("nodemon/lib/utils");

//URL /tasks
router.get('', isAuthenticated, async (req, res) => {
    const tasksList = await taskService.getAll(req.user.id);
    console.log('TasksList: ', tasksList);
    res.render('tasks/allTasks',{tasksList});
});

router.get('/add', isAuthenticated, (req, res) => {
    res.render('tasks/create');
});

router.post('/add', isAuthenticated, async (req, res) => {
    const {title} = req.body;
    const task = await taskService.addTask(title, req.user.id);
    res.status(201).redirect('/tasks');
});

router.get('/:taskId/details', isAuthenticated, async (req, res) => {
    console.log('Details for Task ID: ', req.params.taskId)
    const task = await taskService.getTaskById(req.params.taskId);
    console.log('Task: ', task);
    //TODO if the task user ID is not the current user redirect to 404
    // if (task && task.userId !== req.user.id) {
    //     return res.redirect('/tasks');
    // }
    res.render('tasks/details', {task});
});

router.get('/:taskId/edit', isAuthenticated, async (req, res) => {
    const task = await taskService.getTaskById(req.params.taskId);
    //TODO if the task user ID is not the current user redirect to 404
    // if (task && task.userId !== req.user.id) {
    //     return res.redirect('/tasks');
    // }
    res.render('tasks/edit', {task});
});

router.get('/:taskId/delete', isAuthenticated, async (req, res) => {
    const task = await taskService.getTaskById(req.params.taskId);
    //TODO if the task user ID is not the current user redirect to 404
    // if (task && task.userId !== req.user.id) {
    //     return res.redirect('/tasks');
    // }
    res.render('tasks/delete', {task});
});

module.exports = router;