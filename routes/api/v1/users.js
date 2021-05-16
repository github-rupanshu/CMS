const express = require('express');
const router = express.Router();
const userController = require('../../../controllers/api/v1/user_controller');

router.post('/register',userController.register);
router.post('/logIn',userController.logIn);

module.exports = router;