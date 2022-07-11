const express = require('express');
const { adminAuthorization, authorization, basicAuthorization, admin, user } = require('../middleware/authorization');
const router = express.Router();
const userController = require('./../controllers/user');

router.post('/', basicAuthorization, admin,userController.registerUser);
router.get('/', basicAuthorization, admin ,userController.getUsers);
router.get('/:id', basicAuthorization, user ,userController.getUser);
router.put('/:id', basicAuthorization, admin ,userController.updateUser);
router.delete('/:id', basicAuthorization, admin ,userController.deleteUser);

module.exports = userRouter = router;