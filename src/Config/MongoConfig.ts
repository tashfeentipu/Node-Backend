export const mongoConfig = () => {
    var mongoose = require('mongoose');
    mongoose.connect(process.env["MONGO_CREDENTIALS"]);

    var db = mongoose.connection;

    db.on('error', console.error.bind(console, 'Mongo connection error:'));

    db.once('open', function () {
        console.log("Mongo Connection Successful!");
    });
}