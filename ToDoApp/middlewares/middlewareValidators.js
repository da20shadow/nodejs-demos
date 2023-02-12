const {isValidUsername} = require("../utils/validators");

exports.isValidUsername = (req, res, next) => {
    const {username} = req.body;
    if (username && !isValidUsername(username)) {
        return res.render('user/login', {
            error: 'Username must be between 3 and 45 characters! And can contains only letters digits and underscore'
        });
    }
    next();
}