const router = require('express').Router();
const {isAuthenticated} = require('../middlewares/authMiddleware');
const userService = require('../services/userService');

router.get('/profile',isAuthenticated, async (req, res) => {

    try {
        const result = await userService.getProfileInfo(req.user._id);
        const {user,totalPosts,posts} = result;
        console.log('user', user);
        console.log('total', totalPosts);
        console.log('posts', posts);
        res.render('user/profile',{user,totalPosts,posts})
    }catch (err){
        res.redirect('/404');
    }
})

module.exports = router;