const {Schema, model, Types} = require('mongoose');
const bCrypt = require('bcrypt');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        minLength: 3
    },
    password: {
        type: String,
        minLength: 8,
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

const User = model('User', userSchema);
module.exports = User;