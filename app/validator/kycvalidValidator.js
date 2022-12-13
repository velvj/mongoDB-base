const joi = require("joi");
const { bodyParamValidation } = require("./validator");

const kycValidation = (req, res, next) => {
    const schema = joi.object({
        address: joi.string().required(),
        pinCode: joi.string().length(6).required(),
        panNo: joi.string().length(10).required(),
        nomineeDetails: joi.string().required(),
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