const express = require('express');
const router = express.Router();
const userController = require('../../../controllers/api/v1/user_controller');

router.post('/register',userController.register);
router.post('/logIn',userController.logIn);
router.get('/doc',userController.getDoctor);

module.exports = router;