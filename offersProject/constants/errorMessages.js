const invalidEmail = "Please, enter valid email!";
const invalidFields = "All fields are required!";
const invalidLoginDetails = "Wrong email or password!";
const passMismatch = "Password mismatch!";
const existingUser = "Such user already registered!";
// const getThrowErrorMessage = (err) => {
//     let error = err.message;
//     if (err.errors) {
//         if (err.errors.username) {
//             error = err.errors.username.message;
//         } else if (err.errors.email) {
//             error = err.errors.email.message;
//         } else if (err.errors.password) {
//             error = err.errors.password.message;
//         }
//     }
//     return error;
// }
const getThrowErrorMessage = (err) => {
    if (err.errors){
        return Object.values(err.errors)[0].message;
    }
    return err.message;
}
const offerNotExist = "Such offer not exist!";

module.exports = {
    invalidEmail,
    invalidFields,
    invalidLoginDetails,
    passMismatch,
    existingUser,
    getThrowErrorMessage,
    offerNotExist,
};

