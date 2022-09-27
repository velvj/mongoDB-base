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





const kycValidation = (req, res, next) => {
    const schema = joi.object({
        userId: joi.string().required(),
        address: joi.string().required(),
        pinCode: joi.string().length(6).required(),
        panNo: joi.string().length(10).required(),
        nomineeDetails: joi.object().keys({
            name: joi.string().required(),
            mobileNumber: joi.string().length(10).required(),
            email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).lowercase().required()
        }),
        nearestShowroom: joi.string(),
        referralEmpCode: joi.string().required(),
        isAcceptedTerms: joi.boolean().required(),
        isDeleted: joi.boolean()
    })
    return bodyParamValidation(req, res, next, schema)
}

module.exports={
    kycValidation
}