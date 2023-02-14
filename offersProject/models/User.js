const {Schema,model} = require('mongoose');
const bCrypt = require('bcrypt');
const {schemaRules} = require("../constants");
const {isValidEmail} = require("../utils/validators");

const userSchema = new Schema({
    username: {
        type: String,
        unique: [true, 'Username already registered!'],
        minLength: [schemaRules.minUsernameLength, `Username must be at least ${schemaRules.minUsernameLength}`],
        required: [true,'Username is required!']
    },
    email: {
        type: String,
        required: [true, 'Email is required!'],
        unique: [true, 'Email already registered!'],
        validate: {
            validator: isValidEmail,
            message: (props) => `Please, enter valid email! ${props.value} is not a valid email!`
        }
    },
    password: {
        type: String,
        minLength: [schemaRules.minPasswordLength,`Password must be at least ${schemaRules.minPasswordLength} characters long!`],
        required: [true,'Password is required!'],
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