function validateURL(value) {
    return /^(http|https):\/\/[^ "]+$/.test(value);
}

module.exports = {
    validateURL
};