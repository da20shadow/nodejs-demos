const util = require('util');
const jwtCallBack = require('jsonwebtoken');

//This function get callback function and transform it to promise
const jwt = {
    sign: util.promisify(jwtCallBack.sign),
    verify: util.promisify(jwtCallBack.verify),
};

module.exports = jwt;