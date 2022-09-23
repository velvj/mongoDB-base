const { generateRandomOtp } = require('../helpers/generateOtp');
const { sendErrorResponse, sendSuccessResponse } = require("../response/response");
const { createUserService, getAllUsers, getUser } = require('../services/userAuth.service');


const userRegistration = async(req, res) => {
    const params = req.body;
    params.otp = generateRandomOtp()
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
            result.message,
            result.data
        );
    }
};


const getUserList = async(req, res) => {
    const result = await getAllUsers();
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
    const result = await getUser(params);
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



module.exports = { userRegistration, getUserList, getUserById }