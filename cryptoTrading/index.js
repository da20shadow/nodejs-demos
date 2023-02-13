const express = require('express');
const handlebars = require('express-handlebars');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const routes = require('./routes');

const app = express();

//Setup handlebars view engine
app.engine('hbs', handlebars.engine({extname: 'hbs'}));
app.set('view engine', 'hbs');
//if use the default view folder in the root no need to set the path
//Set default views folder path
app.set('views', './cryptoTrading/views'); //Default is ./views this line is no needed if is in the root!

//Add the folder for static files css js images
//When the request is to /static will search for files in the public folder
app.use('/static',express.static('./cryptoTrading/public'));

// app.use('/static',express.static('/public'));//this way if the request is "static" will go to "public"

//add body parser, if extended is true will use library "qs" to parse complex queries
app.use(express.urlencoded({extended: false}));

app.use(cookieParser());

app.use(routes);

//When the request is wrong to not bring result if is true will bring all results this is bug and the name is also strange but works like that!
mongoose.set('strictQuery', false);

mongoose.connect(`mongodb://127.0.0.1:27017/cryptoApp`);

app.listen(5000, () => {
    console.log('Server is running on port 5000...')
});