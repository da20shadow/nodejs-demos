const bCrypt = require("bcrypt");
const jwt = require('../lib/jsonwebtoken');
const User = require('../models/User');
const {isValidEmail,isValidUsername} = require('../utils/validators');
const {JWT_SECRET} = require('../constants');

exports.findByUsername = async (username) => User.findOne({username});
exports.findByEmail = async (email) => User.findOne({email});
exports.findByUsernameOrEmail = async (username,email) => User.findOne({$or: [{email},{username}]});

exports.login = async (email,password) => {

    if (!isValidEmail(email)){
        throw new Error('Please enter valid email!');
    }
    const user = await this.findByEmail(email);
    if (!user) {
        throw new Error('Bad credentials!');
    }
    console.log('password: ',password)
    console.log('user: ',user)
    console.log('user.password: ',user.password)
    const isPasswordValid = await bCrypt.compare(password,user.password);
    if (!isPasswordValid) {
        throw new Error('Bad credentials!');
    }

    //Generate Token:
    const payload = {
        _id: user.id,
        email,
        username: user.username,
    };
    const token = await jwt.sign(payload, JWT_SECRET);
    console.log('Token: ', token);
    return token;
}

exports.register = async (username,email,password,repeatPassword) => {

    username = username.trim();
    email = email.trim();
    password = password.trim();

    if (!isValidUsername(username)){
        throw new Error('Username must contains only letters digits and underscore!');
    }

    if (!isValidEmail(email)){
        throw new Error('Please enter valid email!');
    }

    if (password !== repeatPassword) {
        throw new Error('Password mismatch!');
    }

    const existingUser = await this.findByUsernameOrEmail(username, email);

    if (existingUser) {
        throw new Error('Such user already registered!');
    }

    password = await bCrypt.hash(password, 9);

    return User.create({username, email, password});
}