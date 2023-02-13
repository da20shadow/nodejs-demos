const bCrypt = require("bcrypt");
const jwt = require('../lib/jsonwebtoken');
const User = require('../models/User');
const {isValidEmail,isValidUsername} = require('../utils/validators');
const {errorMessages,jwtConstants} = require('../constants');

exports.findByUsername = async (username) => User.findOne({username});
exports.findByEmail = async (email) => User.findOne({email});
exports.findByUsernameOrEmail = async (username,email) => User.findOne({$or: [{email},{username}]});

exports.login = async (email,password) => {

    if (!isValidEmail(email)){
        throw new Error(errorMessages.invalidLoginDetails);
    }
    const user = await this.findByEmail(email);
    if (!user) {
        throw new Error(errorMessages.invalidLoginDetails);
    }
    const isPasswordValid = await bCrypt.compare(password,user.password);
    if (!isPasswordValid) {
        throw new Error(errorMessages.invalidLoginDetails);
    }

    //Generate Token:
    const payload = {
        _id: user.id,
        email,
        username: user.username,
    };
    const token = await jwt.sign(payload, jwtConstants.JWT_SECRET);
    console.log('Token: ', token);
    return token;
}

exports.register = async (username,email,password,repeatPassword) => {

    username = username.trim();
    email = email.trim();
    password = password.trim();

    if (!isValidUsername(username)){
        throw new Error(errorMessages.invalidUsername);
    }

    if (!isValidEmail(email)){
        throw new Error(errorMessages.invalidEmail);
    }

    if (password !== repeatPassword) {
        throw new Error(errorMessages.passMismatch);
    }

    const existingUser = await this.findByUsernameOrEmail(username, email);

    if (existingUser) {
        throw new Error(errorMessages.existingUser);
    }

    password = await bCrypt.hash(password, 9);

    return User.create({username, email, password});
}