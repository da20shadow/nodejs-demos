function validateEmail(value) {
    return /^[a-z]+[a-z0-9_]+[@][a-z][.][a-z]{2,11}$/.test(value);
}

module.exports = {
    validateEmail
};