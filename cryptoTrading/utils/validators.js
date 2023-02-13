function isValidEmail(emailInput) {
    return /^[a-z]+[a-z0-9_]+[@][a-z]+[.][a-z]{2,11}$/.test(emailInput);
}

function isValidUsername(usernameInput){
    return /^[a-z]+[a-z0-9_]{3,44}$/.test(usernameInput);
}

function isValidPassword(passwordInput){
    if (passwordInput.length < 8 || passwordInput > 45) {
        return false;
    }
    return /^[a-z]+[a-z0-9_]{3,44}$/.test(passwordInput);
}

module.exports = {
    isValidEmail,
    isValidUsername
};