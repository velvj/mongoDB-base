const { statusCodes } = require("../response/httpStatusCodes");
const { statusMessage } = require("../response/httpStatusMessages");
const { messages } = require("../response/customMesages");
const { sendOTP } = require("../utils/sendOTP.js");
const user = require('../models/userdetails')


const createUserService = async(params = {}) => {
    try {
        const User = new user(params)
        const savedUser = await User.save()
        return {
            status: true,
            data: savedUser,
            message: messages.success,
            statusCode: statusCodes.HTTP_OK,
        };
    } catch {
        return {
            status: false,
            statusCode: statusCodes.HTTP_BAD_REQUEST,
            message: messages.alreadyExist,
            data: [],
        };
    }
}

const getAllUsers = async() => {
    try {
        const userList = await user.find()
        return {
            status: true,
            data: userList,
            message: messages.success,
            statusCode: statusCodes.HTTP_OK,
        };
    } catch {
        return {
            status: false,
            statusCode: statusCodes.HTTP_BAD_REQUEST,
            message: messages.somethingWrong,
            data: [],
        };
    }
}

const getUser = async(params) => {
    try {
        const User = await user.find({ _id: params._id })
        return {
            status: true,
            data: User,
            message: messages.success,
            statusCode: statusCodes.HTTP_OK,
        };

    } catch (error) {
        console.log(error);
        return {
            status: false,
            statusCode: statusCodes.HTTP_BAD_REQUEST,
            message: messages.somethingWrong,
            data: [],
        };
    }
}


module.exports = {
    createUserService,
    getAllUsers,
    getUser
};