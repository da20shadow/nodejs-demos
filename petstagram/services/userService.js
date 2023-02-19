const User = require("../models/User");
const Pet = require("../models/Pet");
const {errorMessages} = require("../constants");

exports.getProfileInfo = async (userId) => {
    const user = await User.findById(userId).lean();
    if (!user) {
        throw new Error(errorMessages.notFoundUser);
    }
    const posts = await Pet.find({ owner: userId }).lean();
    const totalPosts = posts.length;

    return {
        user,
        posts,
        totalPosts
    };
}