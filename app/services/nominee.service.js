const { statusCodes } = require("../response/httpStatusCodes");
const { messages } = require("../response/customMesages");
const nominee = require("../models/nominee");

const createNomineeService = async (params = {}) => {
    try {
        const Nominee = new nominee(params)
        const data = await Nominee.save()
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
    createNomineeService
};