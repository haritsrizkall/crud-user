const express = require('express');
const router = express.Router();
const authController = require('./../controllers/auth');

router.post('/refreshToken', authController.generateToken);
router.post('/login', authController.loginUser);

module.exports = authRouter = router;