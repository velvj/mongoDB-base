const { Router } = require("express");

// validator schemas
const { userValidation } = require("../../validator/validator.js");

//Controllers
const { userRegistration, updateUser, getUserById, getUserList } = require("../../controllers/userManagement.controller");

// validations setup
const router = Router();
const { errHandle } = require("../../utils/errHandle.js");
router.post("/user/addUser", [userValidation], errHandle(userRegistration));
router.get("/user/detailsList", getUserList);
router.get("/user/:_id", errHandle(getUserById));
router.put("/user/update", [userValidation], errHandle(updateUser));


module.exports = router;