const express = require("express");
const router = express.Router();

const kyc = require('./kyc.routes');
const user = require('./user.routes');
const bankDetail = require('./bankDetail.routes');
const nominee = require('./nominee.routes');

router.use('/user', user);
router.use('/kyc', kyc);
router.use('/bank_detail', bankDetail);
router.use('/nominee', nominee);

module.exports = router;