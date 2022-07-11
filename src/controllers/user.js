const Joi = require("joi")
const userRepository = require('./../database/repository/user')
const userTokenRepository = require('./../database/repository/userToken')
const Role = require("../utils/type")
const helper = require('./../utils/helper')
const bcrypt = require('bcrypt')

const registerUserSchema = Joi.object({
    name: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
}) 


const updateUserSchema = Joi.object({
    name: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
    role: Joi.number().required().valid(Role.User, Role.Admin)
})

const registerUser = async (req, res) => {
    const body = req.body
    const validateBody = registerUserSchema.validate(body, {
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

        if (user.length > 0) {
            const response = helper.createResponse('User already exists', 400, null)
            return res.status(response.status).json(response)
        }

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(body.password, salt);

        const newUser = await userRepository.saveUser({
            name: body.name,
            username: body.username,
            password: hashedPassword,
            role: Role.User
        })

        const response = helper.createResponse('User created successfully', 200, newUser)
        return res.status(response.status).json(response)
    } catch (error) {
        console.log(error)
        const response = helper.createResponse('Internal server error', 500, error.message)
        return res.status(response.status).json(response)
    }
}

const getUsers = async (req, res) => {
    try {
        const users = await userRepository.getUsers()
        const response = helper.createResponse('Users retrieved successfully', 200, users)
        return res.status(response.status).json(response)
    }catch(error){
        console.log(error)
        const response = helper.createResponse('Internal server error', 500, error.message)
        return res.status(response.status).json(response)
    }
}

const getUser = async (req, res) => {
    const params = req.params
    try {
        const user = await userRepository.getUserByFilter({
            _id: params.id
        })
        const response = helper.createResponse('User retrieved successfully', 200, user[0])
        return res.status(response.status).json(response)
    }catch(err) {
        console.log(err)
        const response = helper.createResponse('Internal server error', 500, err.message)
        return res.status(response.status).json(response)
    }
}

const updateUser = async (req, res) => {
    const body = req.body
    const params = req.params
    const validateBody = updateUserSchema.validate(body, {
        abortEarly: false
    })
    if (validateBody.error) {
        const response = helper.badRequestResponse(validateBody.error)
        return res.status(response.status).json(response)
    }
    try {
        const updatedUser = await userRepository.updateUser(params.id, body)
        if (!updatedUser) {
            const response = helper.createResponse('User not found', 404, null)
            return res.status(response.status).json(response)
        }
        const response = helper.createResponse('User updated successfully', 200, updatedUser)
        return res.status(response.status).json(response)
    } catch (error) {
        console.log(error)
        const response = helper.createResponse('Internal server error', 500, error.message)
        return res.status(response.status).json(response)
    }
}

const deleteUser = async (req, res) => {
    const params = req.params
    try {
        const deletedUser = await userRepository.deleteUser(params.id)
        if (!deletedUser) {
            const response = helper.createResponse('User not found', 404, null)
            return res.status(response.status).json(response)
        }
        const response = helper.createResponse('User deleted successfully', 200, deletedUser)
        return res.status(response.status).json(response)
    } catch (error) {
        console.log(error)
        const response = helper.createResponse('Internal server error', 500, error.message)
        return res.status(response.status).json(response)
    }
}
module.exports = userController = {
    registerUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser
}