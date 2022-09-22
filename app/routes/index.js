const {Router} = require("express");
const router = Router();
const v1 = require("./v1/user.routes.js");

router.use('/api/v1', v1);

module.exports = router;