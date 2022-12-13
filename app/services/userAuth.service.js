const { statusCodes } = require("../response/httpStatusCodes");
const { statusMessage } = require("../response/httpStatusMessages");
const { messages } = require("../response/customMesages");
const user = require('../models/user');
const profile = require("../models/profile");
const { verifyToken } = require("../utils/auth");

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
    } catch (error) {
        return {
            status: false,
            statusCode: statusCodes.HTTP_INTERNAL_SERVER_ERROR,
            message: error.message,
            data: [],
        };
    }
}

const getAllUsersService = async() => {
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

const getUserService = async(id) => {
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

const updateUserService = async(params, id) => {
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

const changeMpinService = async(params, tokenId) => {
    try {
        const mpin = await user.findById(tokenId)
        if (params.currentMpin === mpin.mpin) {
            const User = await user.updateOne({ _id: tokenId }, { $set: { "mpin": params.newMpin } }, { new: true })
            return {
                status: true,
                data: User,
                message: messages.updated,
                statusCode: statusCodes.HTTP_OK,
            };
        } else {
            return {
                status: false,
                statusCode: statusCodes.HTTP_BAD_REQUEST,
                message: "Current MPIN is wrong",
                data: []
            }
        }
    } catch (error) {
        return {
            status: false,
            statusCode: statusCodes.HTTP_INTERNAL_SERVER_ERROR,
            message: error.message,
            data: [],
        };
    }
}


const createProfileService = async(params = {}) => {
    try {
        const Profile = new profile(params)
        const savedProfile = await Profile.save()
        return {
            status: true,
            data: savedProfile,
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


const getAllProfilesService = async() => {
    try {
        const ProfilesList = await profile.find({}).populate({ path: 'details', select: ["mobileNumber", "email"] })
            .populate({ path: 'address', select: ["address", "pinCode", "nearestShowroom"] })
        console.log(ProfilesList, "ProfilesList")

        return {
            status: true,
            data: ProfilesList,
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


const getProfileService = async(id) => {
    try {
        const Profile = await profile.findById(id).populate({ path: 'details', select: ["mobileNumber", "email"] })
            .populate({ path: 'address', select: ["address", "pinCode", "nearestShowroom"] })
        return {
            status: true,
            data: Profile,
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

module.exports = {
    createUserService,
    getAllUsersService,
    getUserService,
    updateUserService,
    createProfileService,
    getAllProfilesService,
    getProfileService,
    changeMpinService
};