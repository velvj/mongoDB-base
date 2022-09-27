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

const loginValidation = (req, res, next) => {
    const schema = joi.object({
        id: joi.string().required(),
        mpin: joi.number().required()
    });
    return bodyParamValidation(req, res, next, schema);
};


const userValidation = (req, res, next) => {
    const schema = joi.object({
        name: joi.string().required(),
        mobileNumber: joi.string().length(10).required(),
        email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).lowercase().required(),
        isDeleted: joi.boolean(),
        otp: joi.string(),
        isOtpSent: joi.boolean()
    })
    return bodyParamValidation(req, res, next, schema)
}

module.exports={
    loginValidation,
    userValidation
}
