const { Router } = require("express");

const { mpinValidation, verifyOtpValidation } = require("../../validator/validator.js");
const {loginValidation,userValidation}=require("../../validator/user");

const { userRegistration, updateUser, getUserById, getUserList, createMpin, verifyOtp, login } = require("../../controllers/userManagement.controller");

const { errHandle } = require("../../utils/errHandle.js");
const { authMiddleware } = require("../../middleware/authMiddleware.js");

const router = Router();

router.post("/add_user", [userValidation], errHandle(userRegistration));
router.post("/verify_otp", [verifyOtpValidation], errHandle(verifyOtp));
router.post("/create_mpin", [mpinValidation], errHandle(createMpin));
router.post("/login", [loginValidation], errHandle(login));
router.get("/user_list", [authMiddleware], getUserList);
router.get("/:_id", [authMiddleware], errHandle(getUserById));
router.put("/update", [authMiddleware, userValidation], errHandle(updateUser));
router.post("/create_mpin", [mpinValidation], errHandle(createMpin));

module.exports = router;