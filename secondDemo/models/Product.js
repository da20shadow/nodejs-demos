const {Schema} = require('mongoose');

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 45,
    },
    description: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 455,
    },
    price: {
        type: Number,
        min: 0.01,
        max: 100000,
    }
})
