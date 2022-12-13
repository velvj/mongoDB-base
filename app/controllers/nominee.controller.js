const { sendErrorResponse, sendSuccessResponse } = require("../response/response");
const { createNomineeService } = require("../services/nominee.service");

const addNominee = async (req, res) => {
    const params = req.body;
    const result = await createNomineeService({ ...params, userId: req?.user?.id });
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
    addNominee
}