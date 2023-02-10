const {Schema, model, Types} = require('mongoose');
const bCrypt = require('bcrypt');
const {validateEmail} = require('../utils/validators');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        minLength: 3
    },
    email: {
        type: String,
        required: true,
        minLength: 11,
        validate: {
            validator: validateEmail,
            message: 'Please enter valid email!'
        }
    },
    password: {
        type: String,
        minLength: [8,'Password must be at least 8 characters long!'],
        required: true,
    }
});

userSchema.pre('save', function (next) {
    bCrypt.hash(this.password, 9)
        .then(hash => {
            this.password = hash;
            next();
        });
});

userSchema.method('verifyPassword', async function (password) {
    return bCrypt.compare(password, this.password);
});

const User = model('User', userSchema);
module.exports = User;