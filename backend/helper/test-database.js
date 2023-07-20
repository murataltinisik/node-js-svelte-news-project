const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb+srv://altinisikmurat396:f5thwOLPSkkjoTGs@cluster0.olxgoo1.mongodb.net/test');

    mongoose.connection.once('open', () => {
        console.log("MongoDb Test connected successfully!!!");
    }).on('error', (err) => {
        console.log(err);
    });

    mongoose.Promise = global.Promise
}