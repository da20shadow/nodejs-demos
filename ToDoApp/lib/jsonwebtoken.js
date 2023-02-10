const util = require('util');
const jwtCallBack = require('jsonwebtoken');

//This function promisify gets callback function and transform it to promise
const jwt = {
    sign: util.promisify(jwtCallBack.sign),
    verify: util.promisify(jwtCallBack.verify),
};

//Here is what promisify do inside
function promiseSign(payload, secret, options) {
    return new Promise(function (resolve, reject) {
        jwtCallBack.sign(payload, secret, options, (err, token) => {
            if (err) {
                return reject(err);
            }
            resolve(token);
        });
    });
}

module.exports = jwt;