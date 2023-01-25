const express = require('express');
const handlebars = require('express-handlebars');

const loggerMiddleware = require('./middlewares/loggerMiddleware');

const app = express();
const port = 5000;

app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/views`);

// app.use(express.static(`firstDemo/public`));

const validateIDMiddleware = (req, res, next) => {
    console.log('Middleware logger!');
    const id = Number(req.params.id);
    if (!id){
        return res.send('Invalid ID');
    }
    next();
}

//Will use this middleware before route handler!
app.use(loggerMiddleware);

//Adding static files
app.use(express.static(`${__dirname}/public`));

//Homepage
app.get('/',(request,response) => {
    response.render('homepage');
});
//Create post
app.get('/create-post',(request,response) => {
    response.render('createPost',);
});
//Get all users
app.get('/users', (req, res) => {
    const usersList = [
        {id: 1, username: 'vipearn', isAdmin: true},
        {id: 2, username: 'wipstars', isAdmin: false},
        {id: 3, username: 'johndoe', isAdmin: false},
    ]
    res.render('users', {usersList});
});
//Get user by ID
app.get('/users/:userId', (req, res) => {
    const paramsObj = req.params;
    // res.send(`paramsObj.userId: ${paramsObj.userId} <h1>req.params.userId: ${req.params.userId}</h1>`);
    res.render('user', {userId: paramsObj.userId});
});
//Download image by image name
app.get('/images/download/:imgId', (req, res) => {

    if (req.params.imgId === 'forestvietnamboy.jpg'){
        const pathToImg = `./firstDemo/assets/img/${req.params.imgId}`;
        res.download(pathToImg);
    } else {
        res.send(`Img ID ${req.params.imgId} can not be downloaded!`);
    }
});
//SendFile by name (opens file in new page, must give absolute path!)
app.get('/files/download/:fileName', (req, res) => {
    if (req.params.fileName === 'readmeFirst.pdf'){
        const pathToPdf = `./files/${req.params.fileName}`;
        res.sendFile(pathToPdf,{root: __dirname});
    } else {
        res.send(`File name ${req.params.fileName} do not exist!`);
    }
});
//Redirect to page
app.get('/redirect', (req, res) => {
    res.redirect('/redirected');
});
app.get('/redirected', (req, res) => {
    res.send('Redirected page!');
});
//Middleware
app.get("/middleware/:id", validateIDMiddleware, (req, res) => {
    res.send('Middleware Response!');
});
//Not Found Page
app.get('*', (req, res) => {
    res.render('notFound');
});

app.listen(port, () => {
    console.log('Server is listening on port 5000...')
});

