function isValidEmail(emailInput) {
    return /^[a-z]+[a-z0-9_]+[@][a-z]+[.][a-z]{2,11}$/.test(emailInput);
}

function isValidUsername(usernameInput){
    return /^[a-z]+[a-z0-9_]{3,44}$/.test(usernameInput);
}

module.exports = {
    isValidEmail,
    isValidUsername
};