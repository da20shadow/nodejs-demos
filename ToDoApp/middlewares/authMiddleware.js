const jwt = require("../lib/jsonwebtoken");
const config = require("../config/environments");

exports.authentication = async (req, res, next) => {
    const token = req.cookies['auth'];

    if (token) {
        //private user
        try {
            const decodedToken = await jwt.verify(token, config.JWT_SECRET);
            req.user = decodedToken;
            req.isAuthenticated = true;
            res.locals.username = decodedToken.username;
            res.locals.isAuthenticated = true; //Will get this variable in navigation
        } catch (err) {
            console.log(err);
            res.clearCookie('auth');
            return res.redirect('/404');
        }
    } else {
        //public user

    }
    next();
}

exports.isAuthenticated = (req, res, next) => {
    if (!req.isAuthenticated) {
        return res.redirect('/404');
    }
    next();
}