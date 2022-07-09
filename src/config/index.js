require('dotenv').config();

const config = {
    database: {
        "uri": process.env.DB_URI,
    },
    jwtSecret: process.env.JWT_SECRET,
}

module.exports = config;