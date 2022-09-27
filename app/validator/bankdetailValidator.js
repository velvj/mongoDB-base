
const joi = require("joi");
const { bodyParamValidation } = require("./validator");

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