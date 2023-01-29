const {Schema, model} = require('mongoose');

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
    imgUrl: {
        type: String,
        required: true, //TODO: add url validation with regex
    },
    price: {
        type: Number,
        min: 0.01,
        max: 100000,
    },
    category: {
        type: String,
        required: true,
        enum: ['keyboards', 'cameras']
    }
});

const Product = model('Product', productSchema);

module.exports = Product;
