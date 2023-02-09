const User = require('../models/User');

exports.getUserByUsername = async (username) => {
    return User.findOne({username}); //When return no need to use await
}

exports.register = async (username,plainPassword) => {
    return User.create({username,password:plainPassword});
};