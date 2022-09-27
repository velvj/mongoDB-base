const { Router } = require("express");

// validator schemas
const { kycValidation } = require("../../validator/kycvalid");

//Controllers
const { kycRegistration, updateKyc, getUserKycList, getKycById } = require("../../controllers/kycManagement.controller");

// validations setup
const router = Router();
const { errHandle } = require("../../utils/errHandle.js");
router.post("/addKyc", [kycValidation], errHandle(kycRegistration));
router.get("/kycList", getUserKycList);
router.get("/:_id", errHandle(getKycById));
router.put("/update", errHandle(updateKyc));


module.exports = router;