const {Schema, model, Types} = require('mongoose');
const {isValidURL} = require("../utils/validators");

const petSchema = new Schema({
    name: {
        type: String,
        minLength: [2,'Name must be at least 2 characters long!'],
        required: true
    },
    image: {
        type: String,
        required: [true, 'Image is required!'],
        validate: {
            validator: isValidURL,
            message: (props) => `Please, enter valid image url that starts with http:// or https://! ${props.value} is not a valid url!`
        }
    },
    age: {
        type: Number,
        min: [1, 'Minimum age is 1!'],
        maxLength: [100, 'Can not be longer than 100 characters!'],
        required: [true, 'Age is required!'],
    },
    description: {
        type: String,
        minLength: [5, 'Description must be at least 5 characters long!'],
        maxLength: [50, 'Description must be max 50 characters long!'],
        required: [true, 'Description is required!'],
    },
    location: {
        type: String,
        minLength: [5, 'Location must be at least 5 characters long!'],
        maxLength: [50, 'Location must be max 50 characters long!'],
        required: [true, 'Location is required!'],
    },
    commentList: [{
        userID: {
            type: Types.ObjectId,
            ref: 'User'
        },
        comment: {
            type: String,
            minLength: [2, 'Comment must be at least 2 characters long!']
        }
    }],
    owner: {
        type: Types.ObjectId,
        ref: 'User'
    }
});

const Pet = model('Pet', petSchema);
module.exports = Pet;