const dbInit = require('./config/dbini');
const express = require('express');
const cookieParser = require('cookie-parser');
const setupViewEngine = require('./config/viewEngineSetup');
const routes = require('./routes');
const config = require("./config/environments");
const authMiddleware = require('./middlewares/authMiddleware');

const app = express();
//Setup view engine
setupViewEngine(app);

//Set path for the static files
app.use('/static',express.static('./public'));

//Add the body parser
app.use(express.urlencoded({extended: false}));

//Add cookie parser
app.use(cookieParser());

//Add the auth middleware
app.use(authMiddleware.authentication);

//Add routes
app.use(routes);

//Connect with the DB then run the server
dbInit()
    .then(() =>
        app.listen(config.PORT, () => {
            console.log(`The Server is running on port ${config.PORT}...`);
        })
    ).catch((err) => {
    console.log('Error: ',err.message);
});