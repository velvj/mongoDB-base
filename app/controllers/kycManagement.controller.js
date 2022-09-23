const mongoose = require('mongoose')
const userKyc = require('../models/kyc')
const { sendErrorResponse, sendSuccessResponse } = require("../response/response");
const { createKycService, getAllKycsService, getKycService, updateKycService } = require('../services/userKyc.service');

const kycRegistration = async(req, res) => {
    const params = req.body;
    const result = await createKycService(params);
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

const updateKyc = async(req, res) => {
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

const getUserKycList = async(req, res) => {
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

const getKycById = async(req, res) => {
    const params = req.params;
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



module.exports = { kycRegistration, updateKyc, getUserKycList, getKycById }