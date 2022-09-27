const { statusCodes } = require("../response/httpStatusCodes");
const { statusMessage } = require("../response/httpStatusMessages");
const { messages } = require("../response/customMesages");
const userKyc = require('../models/kyc')

const createKycService = async(params = {}) => {
    try {
        console.log('para', params)
        const Kyc = new userKyc(params)
        const savedKyc = await Kyc.save()
        const post = await userKyc.populate(savedKyc, { path: 'userId', select: ['name', 'mobileNumber', 'email', 'otp'] })
        return {
            status: true,
            data: post,
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

const getAllKycsService = async() => {
    try {
        const kycList = await userKyc.find().populate('userId', 'name mobileNumber email otp').select(['-_id', '-createdAt', '-updatedAt', '-__v'])
        return {
            status: true,
            data: kycList,
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

const getKycService = async(params) => {
    try {
        const kyc = await userKyc.find({ _id: params._id }).populate('userId', 'name mobileNumber email otp').select(['-_id', '-createdAt', '-updatedAt', '-__v'])
        return {
            status: true,
            data: kyc,
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


const updateKycService = async(params) => {
    try {
        const editKyc = await userKyc.findByIdAndUpdate({ _id: params._id }, { $set: params }, { new: true })
        return {
            status: true,
            data: editKyc,
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
    createKycService,
    getAllKycsService,
    getKycService,
    updateKycService
};