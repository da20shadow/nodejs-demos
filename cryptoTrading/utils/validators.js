const {schemaRules,regexPatterns} = require("../constants");

function isValidEmail(emailInput) {
    return regexPatterns.emailPattern.test(emailInput);
}

function isValidUsername(usernameInput){
    if (usernameInput.length < schemaRules.minUsernameLength || usernameInput.length > schemaRules.maxUsernameLength) {
        return false;
    }
    return regexPatterns.usernamePattern.test(usernameInput);
}

function isValidPassword(passwordInput){
    if (passwordInput.length < schemaRules.minPasswordLength || passwordInput > schemaRules.maxPasswordLength) {
        return false;
    }
}

module.exports = {
    isValidEmail,
    isValidUsername
};