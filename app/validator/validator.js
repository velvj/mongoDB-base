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

const bodyParamValidation = (req, res, next, schama) => {
    let schema = schama;
    let option = options.basic;
    var { error, value } = schema.validate(req.body, option);
    if (error && Object.keys(error).length > 0) {
        joierrors(
            req,
            res,
            statusCodes.HTTP_BAD_REQUEST,
            statusMessage[400],
            error
        );
    } else {
        next();
    }
};

const queryParamValidation = (req, res, next, schama) => {
    let schema = schama;
    let option = options.basic;
    var { error, value } = schema.validate(req.query, option);
    if (error && Object.keys(error).length > 0) {
        joierrors(
            req,
            res,
            statusCodes.HTTP_BAD_REQUEST,
            statusMessage[400],
            error
        );
    } else {
        if (req.bodyParam) return;
        else next();
    }
};

const loginValidation = (req, res, next) => {
    const schema = joi.object({
        mobileNumber: joi.number().required()
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

module.exports = {
    bodyParamValidation,
    queryParamValidation,
    loginValidation,
    userValidation,
    kycValidation
};