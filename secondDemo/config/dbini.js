const mongoose = require('mongoose');

const dbUri = 'mongodb://127.0.0.1:27017/demo';

async function dbInit(){
    await mongoose.connect(dbUri); //If there is no connection will not print the log!
    console.log('DB Connected!');
}

module.exports = dbInit;