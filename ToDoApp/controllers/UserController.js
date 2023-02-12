const router = require('express').Router();

exports.getProfilePage = (req, res) => {
    const user = req.user;
    res.render('user/profile', {user});
};

exports.getEditProfilePage = (req, res) => {
    res.render('user/edit-profile');
};

exports.postEditProfilePage = (req,res) => {
    //TODO implement edit profile!
};

module.exports = router;
