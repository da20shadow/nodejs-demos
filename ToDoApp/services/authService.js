const User = require('../models/User');
const config = require('../config/environments');
const jwt = require('../lib/jsonwebtoken');

exports.login = async (username, password) => {
    //in node js "this" in module is here in the module not in the global context
    const user = await this.getUserByUsername(username);

    const isValid = await user.verifyPassword(password);
    if (!user || !isValid) {
        throw 'Invalid username or password!';
    }
    const payload = {id: user._id, username: user.username}
    return await jwt.sign(payload, config.JWT_SECRET, {expiresIn: '1h'});
}

exports.getUserByUsername = async (username) => {
    return User.findOne({username}); //When return no need to use await
}

exports.register = async (username, email, plainPassword) => {
    return User.create({username, email, password: plainPassword});
};