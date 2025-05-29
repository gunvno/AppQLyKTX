const express = require('express');
const router = express.Router();
const momoController = require('../controllers/momoController');

router.get('/generate-qr/:MaHD', momoController.generateMomoQrByBillId);

module.exports = router;
