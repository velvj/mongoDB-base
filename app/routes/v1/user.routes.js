const { Router } = require("express");

const { loginValidation, userValidation, mpinValidation, verifyOtpValidation, changeMpinValidation } = require("../../validator/userValidator");

const { userRegistration, updateUser, getUserById, getUserList, createMpin, verifyOtp, login, profileCreation, getProfilesList, getProfileById, changeMpin } = require("../../controllers/userManagement.controller");

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
router.post("/add_profile", errHandle(profileCreation));
router.get("/profile/profiles_list", errHandle(getProfilesList));
router.get("/profile/:_id", [authMiddleware], errHandle(getProfileById));
router.post("/change_mpin", [authMiddleware, changeMpinValidation], errHandle(changeMpin))

module.exports = router;