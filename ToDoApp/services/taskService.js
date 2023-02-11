const Task = require('../models/Task');

exports.delete = async function (taskId) {
    await Task.findByIdAndDelete(taskId);
    return 'Successfully Deleted!';
}

exports.update = async function (taskId, changedTask) {
    console.log(taskId)
    console.log(changedTask)
    await Task.findByIdAndUpdate(taskId, changedTask,{runValidators: true});
    return 'Successfully updated task!';
}

exports.getAll = async (userId) => {
    return Task.find({userId}).lean();
}

exports.addTask = async (title,userId) => {
    return Task.create({title, userId});
}

exports.getTaskById = async (taskId) => {
    return Task.findById({_id: taskId}).lean();
}