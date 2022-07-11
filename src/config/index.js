require('dotenv').config();

const config = {
    database: {
        "uri": process.env.DB_URI,
    },
    jwtSecret: process.env.JWT_SECRET,
    accessTokenExp: process.env.ACCESS_TOKEN_EXP,
    refreshTokenExp: process.env.REFRESH_TOKEN_EXP,
}

module.exports = config;