const User = require('../models/User');
const {errorMessages, JWTConstants} = require("../constants");
const {isValidEmail, isValidUsername} = require("../utils/validators");
const jwt = require("../lib/jswonwebtoken");

exports.findByUsernameOrEmail = async (username,email) => User.findOne({$or: [{email},{username}]});

exports.login = async (username, password) => {

    if (!username || !password) {
        throw new Error(errorMessages.invalidLoginDetails);
    }

    if (!isValidUsername(username)) {
        throw new Error(errorMessages.invalidLoginDetails);
    }

    const user = await User.findOne({username});
    if (!user) {
        throw new Error(errorMessages.invalidLoginDetails);
    }

    const isPassValid = await user.verifyPassword(password);
    if (!isPassValid) {
        throw new Error(errorMessages.invalidLoginDetails);
    }

    const payload = {
        _id: user.id,
        email: user.email,
        username: user.username
    }

    return await jwt.sign(payload, JWTConstants.SECRET_KEY,{expiresIn: '1h'});
}

exports.register = async (username, email, password, rePassword) => {

    if (!username || !email || !password || !rePassword) {
        throw new Error(errorMessages.invalidFields);
    }

    if (password !== rePassword) {
        throw new Error(errorMessages.passMismatch)
    }

    if (!isValidEmail(email)) {
        throw new Error(errorMessages.invalidEmail);
    }

    const user = await this.findByUsernameOrEmail(username,email);
    if (user) {
        throw new Error(errorMessages.existingUser);
    }

    return await User.create({username, email, password});

}
