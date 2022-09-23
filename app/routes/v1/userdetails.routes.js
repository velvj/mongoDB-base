const { Router } = require("express");

// validator schemas
const { userValidation } = require("../../validator/validator.js");

//Controllers
const { userRegistration, getUserById, getUserList } = require("../../controllers//userManagement.controller");


// validations setup
const router = Router();
const { errHandle } = require("../../utils/errHandle.js");

router.post("/details/addUser", [userValidation], errHandle(userRegistration));
router.get("/details/detailsList", getUserList);
router.get("/details/:_id", errHandle(getUserById));


module.exports = router;