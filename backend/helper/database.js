const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb+srv://altinisikmurat396:f5thwOLPSkkjoTGs@cluster0.olxgoo1.mongodb.net/news_app');

    mongoose.connection.once('open', () => {
        console.log("MongoDb connected successfully!!!");
    }).on('error', (err) => {
        console.log(err);
    });

    mongoose.Promise = global.Promise;
};