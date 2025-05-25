const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/all', userController.getAllUsers);
router.get('/getUserById/:id', userController.getUserById);
router.get('/getUserNotRegisteredById/:id', userController.getUserNotRegisteredById);
router.get('/getContractByUser/:id', userController.getContractByUser);
router.get('/getContractByContractId/:id', userController.getContractByContractId);
router.post('/updatePassword/:id', userController.updatePassword);
router.get('/getRequestById/:id', userController.getRequestById);
module.exports = router;
