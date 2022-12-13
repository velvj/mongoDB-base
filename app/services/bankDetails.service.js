const { statusCodes } = require("../response/httpStatusCodes");
const { statusMessage } = require("../response/httpStatusMessages");
const { messages } = require("../response/customMesages");
const bankDetail = require("../models/bankDetail");

const createBankDetailService = async (params = {}) => {
    try {
        const BankDetail = new bankDetail(params)
        const data = await BankDetail.save()
        return {
            status: true,
            data,
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
    createBankDetailService
};