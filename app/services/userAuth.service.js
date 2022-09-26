const { statusCodes } = require("../response/httpStatusCodes");
const { statusMessage } = require("../response/httpStatusMessages");
const { messages } = require("../response/customMesages");
const user = require('../models/user')

const createUserService = async (params = {}) => {
    try {
        const User = new user(params)
        const savedUser = await User.save()
        return {
            status: true,
            data: savedUser,
            message: messages.success,
            statusCode: statusCodes.HTTP_OK,
        };
    } catch (error) {
        return {
            status: false,
            statusCode: statusCodes.HTTP_INTERNAL_SERVER_ERROR,
            message: error.message,
            data: [],
        };
    }
}

const getAllUsersService = async () => {
    try {
        const userList = await user.find()
        return {
            status: true,
            data: userList,
            message: messages.success,
            statusCode: statusCodes.HTTP_OK,
        };
    } catch (error) {
        return {
            status: false,
            statusCode: statusCodes.HTTP_INTERNAL_SERVER_ERROR,
            message: error.message,
            data: [],
        };
    }
}

const getUserService = async (id) => {
    try {
        const User = await user.findById(id)
        return {
            status: true,
            data: User,
            message: messages.success,
            statusCode: statusCodes.HTTP_OK,
        };

    } catch (error) {
        return {
            status: false,
            statusCode: statusCodes.HTTP_INTERNAL_SERVER_ERROR,
            message: error.message,
            data: [],
        };
    }
}

const updateUserService = async (params, id) => {
    try {
        const User = await user.findByIdAndUpdate({ _id: id }, { $set: params }, { new: true })
        return {
            status: true,
            data: User,
            message: messages.updated,
            statusCode: statusCodes.HTTP_OK,
        };

    } catch (error) {
        return {
            status: false,
            statusCode: statusCodes.HTTP_INTERNAL_SERVER_ERROR,
            message: error.message,
            data: [],
        };
    }
}

module.exports = {
    createUserService,
    getAllUsersService,
    getUserService,
    updateUserService
};