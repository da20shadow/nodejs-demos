const jwt = require("../lib/jsonwebtoken");
const {JWT_SECRET} = require('../constants');

exports.authentication = async (req, res, next) => {
    const token = req.cookies['auth'];

    if (token) {
        try {
            const decodedToken = await jwt.verify(token, JWT_SECRET);
            req.user = decodedToken;
            req.isAuthenticated = true;
            res.locals.username = decodedToken.username;
            res.locals.isAuthenticated = true; //Will get this variable in navigation
        } catch (err) {
            console.log(err);
            res.clearCookie('auth');
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