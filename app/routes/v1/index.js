const { Router } = require("express");
const router = Router();

const kyc = require('./kyc.routes')
const user = require('./user.routes')

router.use('/user', user)
router.use('/kyc', kyc)

module.exports = router;