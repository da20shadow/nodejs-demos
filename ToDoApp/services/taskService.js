const Task = require('../models/Task');

exports.getAll = async (userId) => {
    return Task.find({userId}).lean();
}

exports.addTask = async (title,userId) => {
    return Task.create({title, userId});
}

exports.getTaskById = async (taskId) => {
    return Task.findById({_id: taskId}).lean();
}