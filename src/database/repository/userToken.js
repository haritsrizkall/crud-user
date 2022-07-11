const { userTokenModel } = require('../model/userToken');

const saveUserToken = async (data) => {
    const userToken = await userTokenModel.find({
        userId: data.userId,
    })
    if (userToken.length > 0) {
        const newUserToken = await userTokenModel.findByIdAndUpdate(userToken[0]._id, data, {
            new: true,
        })
        return newUserToken;
    }else {
        const userToken = new userTokenModel(data);
        return await userToken.save();
    }
}

const getUserTokenByFilter = async (filter) => {
    return await userTokenModel.find(filter);
}

const deleteUserToken = async (id) => {
    return await userTokenModel.findByIdAndDelete(id);
}

module.exports = userTokenRepository = {
    saveUserToken,
    getUserTokenByFilter,
    deleteUserToken,
}