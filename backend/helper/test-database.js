const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb+srv://adminappuser:HnkuF3vvq1h9Zam4@cluster0.q1ku9um.mongodb.net/test');

    mongoose.connection.once('open', () => {
        console.log("MongoDb Test connected successfully!!!");
    }).on('error', (err) => {
        console.log(err);
    });

    mongoose.Promise = global.Promise
}