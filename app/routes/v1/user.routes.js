const { Router } = require("express");

// validator schemas
const { userValidation } = require("../../validator/validator.js");

//Controllers
const { userRegistration, updateUser, getUserById, getUserList } = require("../../controllers/userManagement.controller");

// validations setup
const router = Router();
const { errHandle } = require("../../utils/errHandle.js");
const { authMiddleware } = require("../../utils/auth.js");
router.post("/addUser",
    [userValidation],
    errHandle(userRegistration));
router.get("/userList", getUserList);
router.get("/:_id", [authMiddleware], errHandle(getUserById));
router.put("/update", [userValidation], errHandle(updateUser));


module.exports = router;