const { userModel } = require("../model/user")


const saveUser = async (data) => {
    const user = new userModel(data);
    return await user.save();
}

const getUsers = async () => {
    return await userModel.find();
}

const getUserByFilter = async (filter) => {
    return await userModel.find(filter);
}

const updateUser = async (id, user) => {
    return await userModel.findByIdAndUpdate(id, user, {
        new: true,
    });
}

const deleteUser = async (id) => {
    return await userModel.findByIdAndDelete(id);
}

module.exports = userRepository = {
    saveUser,
    getUsers,
    getUserByFilter,
    updateUser,
    deleteUser,
}