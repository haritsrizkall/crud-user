const mongoose = require('mongoose');

const userTokenSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
}, {
    collection: 'userTokens',
})

module.exports = {
    userTokenModel: mongoose.model('userTokenModel', userTokenSchema),
}