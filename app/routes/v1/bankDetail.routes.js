const { Router } = require("express");

const { addBankDetail } = require("../../controllers/bankDetails.controller.js");
const { authMiddleware } = require("../../middleware/authMiddleware.js");
const { addBankDetailValidation } = require("../../validator/bankdetail");
const { errHandle } = require("../../utils/errHandle.js");

const router = Router();

router.post("/create", [authMiddleware, addBankDetailValidation], errHandle(addBankDetail));

module.exports = router;    