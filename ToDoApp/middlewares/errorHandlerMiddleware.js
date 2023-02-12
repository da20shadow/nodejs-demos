const errorHandler = (err,req,res,next) => {
    console.log(err.message);
    //Here can redirect to 404 for example and show error message
    //For example someone check product then in url add /edit and will access edit page
    //But here we can redirect him to 404 and say you can't edit product (stupid but yes)
    next();
}
module.exports = {
    errorHandler
}