const mongoose = require('mongoose');

const config = require('./appConfig');

async function dbInit(){
    mongoose.set('strictQuery', false);
    await mongoose.connect(config.DB_URI); //If there is no connection will not print the log!
    console.log('DB Connected!');
}

module.exports = dbInit;