const express = require('express');
const config = require('./config/appConfig');
const setupViewEngine = require('./config/viewEngine');

const app = express();
setupViewEngine(app);
//Another way to cal the setupViewEngine function
// require('./config/viewEngine')(app);

//Set path for our static files with middleware
app.use(express.static('./secondDemo/public'));

app.get('/', (req,res) => {
    res.render('home');
})

app.listen(config.PORT, () => {
    console.log(`Server is running on port ${config.PORT}...`);
});
