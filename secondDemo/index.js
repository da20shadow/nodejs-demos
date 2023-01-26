const express = require('express');
const config = require('./config/appConfig');
const setupViewEngine = require('./config/viewEngine');
const productController = require('./controllers/CubeController');
const routes = require('./routes');

const app = express();
setupViewEngine(app);
//Another way to cal the setupViewEngine function
// require('./config/viewEngine')(app);

//Set path for our static files with middleware
app.use(express.static('./secondDemo/public'));
app.use(routes);

app.listen(config.PORT, () => {
    console.log(`Server is running on port ${config.PORT}...`);
});
