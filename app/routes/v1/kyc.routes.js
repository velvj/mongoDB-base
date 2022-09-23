const { Router } = require("express");
// validator schemas

const { kycValidation } = require("../../validator/validator.js");

//Controllers
const { kycRegistration, updateKyc, getUserKycList, getKycById } = require("../../controllers/kycManagement.controller");
// validations setup

const router = Router();
const { errHandle } = require("../../utils/errHandle.js");
router.post("/kyc/addKyc", [kycValidation], errHandle(kycRegistration));
router.get("/kyc/kycList", getUserKycList);
router.get("/kyc/:_id", errHandle(getKycById));
router.put("/kyc/update", errHandle(updateKyc));


module.exports = router;