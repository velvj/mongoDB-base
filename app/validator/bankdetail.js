
const joi = require("joi");
const { statusCodes } = require("../response/httpStatusCodes");
const { statusMessage } = require("../response/httpStatusMessages");
const { joierrors } = require("../response/response");
const options = {
    // generic option
    basic: {
        abortEarly: false,
        convert: true,
        allowUnknown: false,
        stripUnknown: true,
    },
    // Options for Array of array
    array: {
        abortEarly: false,
        convert: true,
        allowUnknown: true,
        stripUnknown: {
            objects: true,
        },
    },
};



const addBankDetailValidation = (req, res, next) => {
    const schema = joi.object({
        accountHolderName: joi.string().required(),
        bankName: joi.string().required(),
        branch: joi.string().required(),
        ifsc: joi.string().required(),
        accountNumber: joi.string().required(),
    })
    return bodyParamValidation(req, res, next, schema);
}

module.exports={
    addBankDetailValidation
}