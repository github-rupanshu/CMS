const express = require('express');

const router = express.Router();

router.use('/user', require('./users'));
router.use('/slot', require('./slot'));
router.use('/appointment',require('./appointment'));

module.exports = router;