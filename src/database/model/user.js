const mongoose = require('mongoose');
const Role = require('../../utils/type');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: Number,
        required: true,
        default: Role.User,  
    }
}, {
    timestamps: true,
    collection: 'users',
})

module.exports = {
    userModel: mongoose.model('userModel', userSchema),
}