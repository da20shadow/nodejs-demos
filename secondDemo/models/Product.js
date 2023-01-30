const {Schema, model, Types} = require('mongoose');
const {validateURL} = require('../utils/validators');

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
        required: true,
        validate: {
            validator: validateURL,
            message: 'Please enter valid image url!'
        }
    },
    price: {
        type: Number,
        min: 0.01,
        max: 100000,
    },
    category: {
        type: String,
        required: true,
        enum: ['keyboards', 'cameras'],
    },
    accessories: [{
        type: Types.ObjectId,
        ref: 'Accessory'
    }]
});

const Product = model('Product', productSchema);

module.exports = Product;
