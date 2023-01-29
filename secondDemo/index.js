const express = require('express');
const config = require('./config/appConfig');
const setupViewEngine = require('./config/viewEngine');
const routes = require('./routes');
const dbInit = require('./config/dbini');

const app = express();
setupViewEngine(app);
//Another way to cal the setupViewEngine function
// require('./config/viewEngine')(app);

//Set path for our static files with middleware
app.use(express.static('./secondDemo/public'));
//Read request body
app.use(express.urlencoded({extended: false}));
//User routes
app.use(routes);

//If there is connection with the DB then run the server
dbInit()
    .then(() =>
    app.listen(config.PORT, () => {
        console.log(`Server is running on port ${config.PORT}...`);
    })
    ).catch((err) => {
    console.log(err);
    });

