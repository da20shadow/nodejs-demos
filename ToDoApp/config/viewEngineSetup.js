const handlebars = require("express-handlebars");

function setupViewEngine(app){
    //Setting the extension to be .hbs
    //Here in this config also can be changed the layouts directory and partials
    app.engine('hbs', handlebars.engine({
        extname: 'hbs'
    }));
    app.set('view engine', 'hbs');
    //Set default views folder path
    app.set('views', './ToDoApp/views'); //Default is ./views
}

module.exports = setupViewEngine;