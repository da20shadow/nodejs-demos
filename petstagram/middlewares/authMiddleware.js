const jwt = require("../lib/jswonwebtoken");
const {JWTConstants} = require('../constants')

exports.authentication = async (req, res, next) => {
    const token = req.cookies['token'];

    if (token) {
        try {
            const decodedToken = await jwt.verify(token, JWTConstants.SECRET_KEY);
            req.user = decodedToken;
            req.isAuthenticated = true;
            res.locals.user = decodedToken;
            res.locals.isAuthenticated = true;
        } catch (err) {
            console.log(err);
            res.clearCookie('token');
            return res.redirect('/404');
        }
    }
    next();
}

exports.isAuthenticated = (req, res, next) => {
    if (!req.isAuthenticated) {
        return res.redirect('/404');
    }
    next();
}