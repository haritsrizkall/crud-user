const jwt = require('jsonwebtoken');
const config = require('../config');
const { unauthorizedResponse } = require("./../utils/helper")
const Role = require('../utils/type');
const userRepository = require('../database/repository/user');

const basicAuthorization = async (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        return res.status(401).json(unauthorizedResponse());
    }else {
        const token = authHeader.split(' ');
        if (token[0] !== 'Bearer' || token.length !== 2) {
            return res.status(401).json(unauthorizedResponse());
        }
        try {
            const decoded = jwt.verify(token[1], config.jwtSecret);
            req.userId = decoded.id;
            next();
        } catch (error) {
            return res.status(401).json(unauthorizedResponse(error.message));  
        }
    }
}

const admin = async (req, res, next) => {
    const userId = req.userId;
    const user = await userRepository.getUserByFilter({
        _id: userId
    });
    if (user.length === 0) {
        return res.status(401).json(unauthorizedResponse());
    }
    if (user[0].role !== Role.Admin) {
        return res.status(401).json(unauthorizedResponse());
    }
    next();
}

const user = async (req, res, next) => {
    const userId = req.userId;
    const params = req.params;
    const user = await userRepository.getUserByFilter({
        _id: userId
    });
    if (user.length === 0) {
        return res.status(401).json(unauthorizedResponse());
    }
    if (user[0].role === Role.Admin) {
        return next();
    }
    if (params.id !== userId) {
        return res.status(401).json(unauthorizedResponse());
    }
    next();
}

module.exports = {
    basicAuthorization,
    admin,
    user
};