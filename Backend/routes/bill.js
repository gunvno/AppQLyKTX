const express = require('express');
const router = express.Router();
const billController = require('../controllers/billController');

router.get('/:username', billController.getBillsByUsername);
router.get('/detail/:id', billController.getBillDetail);
router.post('/update-status/:id', billController.updateBillStatus);
router.get('/all/:username', billController.getBillsByUserId);

module.exports = router;
