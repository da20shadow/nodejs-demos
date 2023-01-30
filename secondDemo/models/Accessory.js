const {Schema,model} = require('mongoose');
const {validateURL} = require("../utils/validators");

const accessorySchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    description: {
        type: String,
    },
    category: {
        type: String,
        required: true,
        enum: ['speakers', 'microphone']
    },
    price: {
        type: Number,
        required: true,
        min: 0.01,
    },
    imgUrl: {
        type: String,
        validate: {
            validator: validateURL,
            message: 'Please enter valid image url!'
        }
    }
});

const Accessory = model('Accessory', accessorySchema);

module.exports = Accessory;