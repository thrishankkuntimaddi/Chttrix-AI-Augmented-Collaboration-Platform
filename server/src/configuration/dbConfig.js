const mongoose = require('mongoose'); 


mongoose.connect("mongodb://localhost:27017/JWT-DB");

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected to JWT-DB');
});

mongoose.connection.on('error', (err) => {
    console.error(`Mongoose connection error: ${err}`);
});

