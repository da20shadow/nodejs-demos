const util = require('util');
const jwtCallBack = require('jsonwebtoken');

const jwt = {
    sign: util.promisify(jwtCallBack.sign),
    verify: util.promisify(jwtCallBack.verify),
};

module.exports = jwt;