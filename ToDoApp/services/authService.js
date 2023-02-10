const User = require('../models/User');

exports.login = async (username, password) => {
    //in node js "this" in module is here in the module not in the global context
    const user = await this.getUserByUsername(username);

    const isValid = await user.verifyPassword(password);
    if (!user || !isValid){
        throw 'Invalid username or password!';
    }
}

exports.getUserByUsername = async (username) => {
    return User.findOne({username}); //When return no need to use await
}

exports.register = async (username,plainPassword) => {
    return User.create({username,password:plainPassword});
};