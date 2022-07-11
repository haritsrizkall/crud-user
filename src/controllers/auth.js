const config = require('../config')
const Joi = require("joi")
const helper = require('./../utils/helper')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const loginShema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
})

const generateTokenSchema = Joi.object({
    refreshToken: Joi.string().required(),
})

const generateToken = async (req, res) => {
    const body = req.body
    const validateBody = generateTokenSchema.validate(body, {
        abortEarly: false
    })
    if (validateBody.error) {
        const response = helper.badRequestResponse(validateBody.error)
        return res.status(response.status).json(response)
    }

    try {
        const decoded = jwt.verify(body.refreshToken, config.jwtSecret)
    } catch (error) {
        return res.status(401).json(helper.unauthorizedResponse(error.message));  
    }

    const userToken = await userTokenRepository.getUserTokenByFilter({
        refreshToken: body.refreshToken
    })

    if (userToken.length === 0) {
        const response = helper.unauthorizedResponse('Invalid refresh token')
        return res.status(response.status).json(response)
    }

    const token = jwt.sign({
        id: userToken[0].userId,
    },config.jwtSecret, {
        expiresIn: config.accessTokenExp,
    })
    
    const response = helper.createResponse('New token', 200, {
        token: token,
    });

    return res.status(response.status).json(response)
}

const loginUser = async (req, res) => {
    const body = req.body
    const validateBody = loginShema.validate(body, {
        abortEarly: false
    })

    if (validateBody.error) {
        const response = helper.badRequestResponse(validateBody.error)
        return res.status(response.status).json(response)
    }

    try {
        const user = await userRepository.getUserByFilter({
            username: body.username
        })
        if (user.length === 0) {
            const response = helper.createResponse('User not found', 400, null)
            return res.status(response.status).json(response)
        }
        const token = jwt.sign({
            id: user[0]._id,
        }, process.env.JWT_SECRET,{
            expiresIn: config.accessTokenExp
        })

        const isValid = await bcrypt.compare(body.password, user[0].password)

        if (!isValid) {
            const response = helper.createResponse('Invalid password', 400, null)
            return res.status(response.status).json(response)
        }

        const refreshToken = jwt.sign({
            id: user[0]._id,
        }, config.jwtSecret, {
            expiresIn: config.refreshTokenExp
        })

        const newUserToken = await userTokenRepository.saveUserToken({
            userId: user[0]._id,
            token: refreshToken,
        });

        const response = helper.createResponse('Login successful', 200, {
            token: token,
            refreshToken: refreshToken,
        })
        return res.status(response.status).json(response)
    }catch(error){
        console.log(error)
        const response = helper.createResponse('Internal server error', 500, error.message)
        return res.status(response.status).json(response)
    }
}

module.exports = authController = {
    generateToken,
    loginUser
}