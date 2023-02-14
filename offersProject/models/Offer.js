const {Schema, model, Types} = require('mongoose');

const offerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: {
            values: ['one', 'two', 'three'],
            message: (props) => `${props.value} is not supported!`
        },
    },
    owner: {
        type: Types.ObjectId,
        ref: 'User'
    }
});

const Offer = model('Offer', offerSchema);
module.exports = Offer;