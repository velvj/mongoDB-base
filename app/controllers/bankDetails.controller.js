const { sendErrorResponse, sendSuccessResponse } = require("../response/response");
const { createBankDetailService } = require('../services/bankDetails.service');

const addBankDetail = async (req, res) => {
    const params = req.body;
    const result = await createBankDetailService({ ...params, userId: req?.user?.id });
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

module.exports = {
    addBankDetail
}