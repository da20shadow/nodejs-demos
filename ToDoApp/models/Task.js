const {Schema, model, Types} = require('mongoose');

const taskSchema = new Schema({
    title: {
        type: String,
        required: true,
        minLength: 5
    },
    description: {
        type: String,
    },
    userId: {
        type: Types.ObjectId,
        ref: 'User',
    }
});

const Task = model('Task', taskSchema);
module.exports = Task;