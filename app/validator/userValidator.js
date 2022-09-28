const joi = require("joi");
const { bodyParamValidation } = require("./validator");

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

const mpinValidation = (req, res, next) => {
    const schema = joi.object({
        id: joi.string().required(),
        mpin: joi.number().required()
    })
    return bodyParamValidation(req, res, next, schema)
}

const verifyOtpValidation = (req, res, next) => {
    const schema = joi.object({
        id: joi.string().required(),
        otp: joi.number().required()
    })
    return bodyParamValidation(req, res, next, schema)
}

module.exports={
    loginValidation,
    userValidation,
    mpinValidation,
    verifyOtpValidation
}
