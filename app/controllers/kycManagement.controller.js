const { sendErrorResponse, sendSuccessResponse } = require("../response/response");
const { createKycService, getAllKycsService, getKycService, updateKycService } = require('../services/userKyc.service');

const { statusCodes } = require('../response/httpStatusCodes');
const { messages } = require("../response/customMesages");

const createKyc = async (req, res) => {
    const params = req.body || {};
    if (!params?.isAcceptedTerms) return sendErrorResponse(
        req,
        res,
        statusCodes.HTTP_BAD_REQUEST,
        "Accept Terms to continue",
        []
    );
    const result = await createKycService({ ...params, userId: req?.user?.id });
    if (!result.status) {
        return sendErrorResponse(
            req,
            res,
            statusCodes.HTTP_BAD_REQUEST,
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

const updateKyc = async (req, res) => {
    const body = req.body;
    const result = await updateKycService(body);
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

const getUserKycList = async (req, res) => {
    const result = await getAllKycsService();
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

const getKycById = async (req, res) => {
    const params = req?.params;
    const result = await getKycService(params);
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



module.exports = { createKyc, updateKyc, getUserKycList, getKycById }