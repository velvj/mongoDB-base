const { Router } = require("express");
const router = Router();
// const v1 = require("./v1/user.routes.js");
const v2 = require('./v1/kyc.routes')
const v3 = require('./v1/userdetails.routes')

// router.use('/api/v1', v1);
router.use('/api/v2', v2);
router.use('/api/v3', v3)

module.exports = router;