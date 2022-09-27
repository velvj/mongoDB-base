const { Router } = require("express");

const { authMiddleware } = require("../../middleware/authMiddleware.js");
const { errHandle } = require("../../utils/errHandle.js");
const { addNominee } = require("../../controllers/nominee.controller.js");
const { addNomineeValidation } = require("../../validator/nominee");

const router = Router();

router.post("/create", [authMiddleware, addNomineeValidation], errHandle(addNominee));

module.exports = router;