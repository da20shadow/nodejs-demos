const dbInit = require('./config/dbini');
const express = require('express');
const setupViewEngine = require('./config/viewEngineSetup');
const routes = require('./routes');
const config = require("./config/environments");

const app = express();
setupViewEngine(app); //Setup View Engine

//Set path for the static files
app.use(express.static('./ToDoApp/public'));

//Read request body
app.use(express.urlencoded({extended: false}));

//User routes
app.use(routes);

//If there is connection with the DB ONLY then run the server
dbInit()
    .then(() =>
        app.listen(config.PORT, () => {
            console.log(`The Server is running on port ${config.PORT}...`);
        })
    ).catch((err) => {
    console.log('Error: ',err.message);
});