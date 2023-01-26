exports.getHomePage = (req, res) => {
    res.render('home');
};

exports.get404Page = (req, res) => {
    res.render('404');
};