const {Schema, model, Types} = require('mongoose');
const bCrypt = require('bcrypt');

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
        minLength: [3, 'Username must be between 3 and 45 characters long!'],
        maxLength: [45, 'Username must be between 3 and 45 characters long!']
    },
    email: {
        type: String,
        required: [true, 'email is required!'],
        unique: true,
        minLength: 11,
        validate: {
            validator: isValidEmail,
            message: (props) => `${props.value} is invalid email! Please, enter valid email!`
        }
    },
    password: {
        type: String,
        minLength: [8,'Password must be at least 8 characters long!'],
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