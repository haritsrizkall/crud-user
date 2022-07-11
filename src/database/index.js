const mongoose = require('mongoose');
const config = require('../config');

const connect = async () => {
    console.log("start connecting")
    try {
        await mongoose.connect(config.database.uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }, (err) => {
            if (err) {
                console.log(err);
            }
            console.log('Database connected');
        });
    } catch (error) {
        console.log('Connect to database failed. Error : ', err);
    }
}

const test = () => {
    console.log("TESTT")
}

module.exports = {
    connect,
    test
};