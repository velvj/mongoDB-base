
const joi = require("joi");
const { bodyParamValidation } = require("./validator");

const addNomineeValidation = (req, res, next) => {
    const schema = joi.object({
        name: joi.string().required(),
        email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).lowercase().required(),
        mobileNumber: joi.string().length(10).required(),
    })
    return bodyParamValidation(req, res, next, schema)
}

module.exports={
    addNomineeValidation
}