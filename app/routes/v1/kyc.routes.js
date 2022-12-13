const { Router } = require("express");

// validator schemas
const { kycValidation } = require("../../validator/kycvalidValidator");

//Controllers
const { updateKyc, getUserKycList, getKycById, createKyc } = require("../../controllers/kycManagement.controller");

// validations setup
const router = Router();
const { errHandle } = require("../../utils/errHandle.js");
const { authMiddleware } = require("../../middleware/authMiddleware.js");
router.post("/create", [authMiddleware, kycValidation], errHandle(createKyc));
router.get("/kycList", getUserKycList);
router.get("/:_id", errHandle(getKycById));
router.put("/update", errHandle(updateKyc));

module.exports = router;