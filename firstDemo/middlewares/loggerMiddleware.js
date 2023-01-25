module.exports = (req,res,next) => {
    console.log(`Requested URL: ${req.url} Method: ${req.method}`);
    next();
}