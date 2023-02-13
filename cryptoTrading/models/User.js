const {Schema, model, Types} = require('mongoose');
const bCrypt = require('bcrypt');
const {schemaRules,errorMessages} = require('../constants');

const {isValidEmail} = require("../utils/validators");

const userSchema = new Schema({
    firstName: {
      type: String,
    },
    lastName: {
        type: String,
    },
    username: {
        type: String,
        unique: [true,'Username is already registered!'],
        required: [true, 'Username is required'],
        minLength: [schemaRules.minUsernameLength, errorMessages.shortUsernameErr(schemaRules.minUsernameLength)],
        maxLength: [schemaRules.maxUsernameLength, errorMessages.longUsernameErr(schemaRules.maxUsernameLength)]
    },
    email: {
        type: String,
        required: [true, 'email is required!'],
        unique: true,
        validate: {
            validator: isValidEmail,
            message: (props) => `Please, enter valid email! ${props.value} is not a valid email!`
        }
    },
    password: {
        type: String,
        minLength: [schemaRules.minPasswordLength,'Password must be at least 8 characters long!'],
        required: [true,'Password is required!'],
    }
},{
    virtuals: {
        fullName: {
            get() {
                return `${this.firstName} ${this.lastName}`;
            }
        }
    }
});

// userSchema.pre('save', function (next) {
//     bCrypt.hash(this.password, 9)
//         .then(hash => {
//             this.password = hash;
//             next();
//         });
// });

userSchema.method('verifyPassword', async function (password) {
    return bCrypt.compare(password, this.password);
});

const User = model('User', userSchema);
module.exports = User;