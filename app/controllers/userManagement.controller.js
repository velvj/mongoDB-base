const { generateRandomOtp } = require('../helpers/generateOtp');
const { sendErrorResponse, sendSuccessResponse } = require("../response/response");
const { createUserService, updateUserService, getAllUsersService, getUserService } = require('../services/userAuth.service');
const { generateToken } = require('../utils/auth');

const userRegistration = async (req, res) => {
    const params = req.body;
    params.otp = generateRandomOtp();

    const result = await createUserService({ ...params });
    if (!result.status) {
        return sendErrorResponse(
            req,
            res,
            result.statusCode,
            result.message, []
        );
    } else {
        const token = generateToken({ id: result.data.id })
        return sendSuccessResponse(
            req,
            res,
            result.statusCode,
            result.message,
            { token }
        );
    }
};


const updateUser = async (req, res) => {
    const body = req.body;
    const result = await updateUserService(body);
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


const getUserList = async (req, res) => {
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


const getUserById = async (req, res) => {
    const params = req.params;
    const result = await getUserService(params);
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



module.exports = { userRegistration, getUserList, getUserById, updateUser }