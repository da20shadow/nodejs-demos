const mongoose = require('mongoose');

const config = require('./environments');

async function dbInit(){
    mongoose.set('strictQuery', false);
    await mongoose.connect(config.DB_URI);
    console.log('DB Connected!');
}

module.exports = dbInit;