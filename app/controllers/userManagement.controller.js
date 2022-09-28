const { generateRandomOtp } = require('../helpers/generateOtp');
const { statusCodes } = require('../response/httpStatusCodes');
const { sendErrorResponse, sendSuccessResponse } = require("../response/response");
const { createUserService, updateUserService, getAllUsersService, getUserService, createProfileService, getAllProfilesService, getProfileService, changeMpinService } = require('../services/userAuth.service');
const { generateToken } = require('../utils/auth');
const { messages } = require("../response/customMesages");

const userRegistration = async(req, res) => {
    const params = req.body;
    params.otp = generateRandomOtp();

    const result = await createUserService({...params });
    if (!result.status) {
        return sendErrorResponse(
            req,
            res,
            result.statusCode,
            result.message, []
        );
    } else {
        return sendSuccessResponse(
            req,
            res,
            result.statusCode,
            result.message, { id: result.data.id }
        );
    }
};

const updateUser = async(req, res) => {
    const { _id: id, ...params } = req.body;
    const result = await updateUserService(params, id);
    if (!result.status) {
        return sendErrorResponse(
            req,
            res,
            result.statusCode,
            result.message, []
        );
    } else {
        return sendSuccessResponse(
            req,
            res,
            result.statusCode,
            result.message,
            result.data
        );
    }
};

const createMpin = async(req, res) => {
    const { id, ...params } = req.body;
    const result = await updateUserService(params, id);
    if (!result.status) {
        return sendErrorResponse(
            req,
            res,
            result.statusCode,
            result.message, []
        );
    } else {
        return sendSuccessResponse(
            req,
            res,
            result.statusCode,
            result.message,
            result.data
        );
    }
};


const changeMpin = async(req, res) => {
    const {...params } = req.body
    const result = await changeMpinService(params, req.user.id);
    if (!result.status) {
        return sendErrorResponse(
            req,
            res,
            result.statusCode,
            result.message, []
        );
    } else {

        return sendSuccessResponse(
            req,
            res,
            result.statusCode,
            result.message
        );
    }
};

const login = async(req, res) => {
    const { id, mpin } = req.body;
    const result = await getUserService(id);
    if (!result.status) {
        return sendErrorResponse(
            req,
            res,
            statusCodes.HTTP_NOT_FOUND,
            messages.dataNotFound, []
        );
    } else {
        if (+result.data.mpin !== +mpin) return sendErrorResponse(
            req,
            res,
            400,
            "MPIN not match", []
        );
        const token = generateToken({ id });
        return sendSuccessResponse(
            req,
            res,
            result.statusCode,
            result.message, { token }
        );
    }
};

const verifyOtp = async(req, res) => {
    const { id, otp } = req.body;
    const result = await getUserService(id);
    if (!result.status) {
        return sendErrorResponse(
            req,
            res,
            result.statusCode,
            result.message, []
        );
    } else {
        if (+result.data.otp !== +otp) return sendErrorResponse(
            req,
            res,
            400,
            "OTP Not Valid", []
        );
        const updateUser = await updateUserService({ isOtpVerified: true }, id);
        if (!updateUser.status)
            return sendErrorResponse(
                req,
                res,
                updateUser.statusCode,
                updateUser.message, []
            );
        return sendSuccessResponse(
            req,
            res,
            statusCodes.HTTP_OK,
            "OTP verified", []
        );
    }
}

const getUserList = async(req, res) => {
    const result = await getAllUsersService();
    if (!result.status) {
        return sendErrorResponse(
            req,
            res,
            result.statusCode,
            result.message, []
        );
    } else {
        return sendSuccessResponse(
            req,
            res,
            result.statusCode,
            result.message,
            result.data
        );
    };
}

const getUserById = async(req, res) => {
    const params = req.params;
    const result = await getUserService(params._id);
    if (!result.status)
        return sendErrorResponse(
            req,
            res,
            result.statusCode,
            result.message, []
        );
    return sendSuccessResponse(
        req,
        res,
        result.statusCode,
        result.message,
        result.data
    );
}


const profileCreation = async(req, res) => {
    const params = req.body;
    const result = await createProfileService({...params });
    if (!result.status) {
        return sendErrorResponse(
            req,
            res,
            result.statusCode,
            result.message, []
        );
    } else {
        return sendSuccessResponse(
            req,
            res,
            result.statusCode,
            result.message, { id: result.data.id }
        );
    }
};


const getProfilesList = async(req, res) => {
    const result = await getAllProfilesService();
    console.log(result, "result")
    if (!result.status) {
        return sendErrorResponse(
            req,
            res,
            result.statusCode,
            result.message, []
        );
    } else {
        return sendSuccessResponse(
            req,
            res,
            result.statusCode,
            result.message,
            result.data
        );
    };
}

const getProfileById = async(req, res) => {
    const params = req.params;
    const result = await getProfileService(params._id);
    if (!result.status)
        return sendErrorResponse(
            req,
            res,
            result.statusCode,
            result.message, []
        );
    return sendSuccessResponse(
        req,
        res,
        result.statusCode,
        result.message,
        result.data
    );
}



module.exports = {
    userRegistration,
    getUserList,
    getUserById,
    updateUser,
    createMpin,
    verifyOtp,
    login,
    profileCreation,
    getProfilesList,
    getProfileById,
    changeMpin
}