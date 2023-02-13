const shortUsernameErr = (minLength) => `Username must be at least ${minLength} characters long!`;
const longUsernameErr = (maxLength) => `Username can not be longer than ${maxLength} characters!`;
const invalidLoginDetails = 'Wrong email or password!';
const invalidEmail = "Please, enter valid email!";
const invalidUsername = "Username must contains only letters digits and underscore!";
const passMismatch = "Password mismatch!";
const existingUser = "Such user already exist!";

module.exports = {
    shortUsernameErr,
    longUsernameErr,
    invalidLoginDetails,
    invalidEmail,
    invalidUsername,
    passMismatch,
    existingUser,
}