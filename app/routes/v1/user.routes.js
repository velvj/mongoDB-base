
const {Router} = require("express");
// validator schemas

const {loginValidation} = require("../../validator/validator.js");

//Controllers
const { login } = require("../../controllers/userAuthManagement.controller");
// validations setup

const router = Router();
const { errHandle } = require("../../utils/errHandle.js");
router.post(
  "/user/login",
  [loginValidation],
  errHandle(login)
);


module.exports = router;
