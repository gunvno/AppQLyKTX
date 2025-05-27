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
router.post('/sendPassword/:id', (req, res) => {
    const TenDangNhap = req.params.id;
    userController.sendPassword(TenDangNhap, (result) => {
      if (result.success) {
        res.status(200).json(result);
      } else if (result.message === 'Không tìm thấy người dùng') {
        res.status(404).json(result);
      } else {
        res.status(500).json(result);
      }
    });
  });
router.get('/getRoomByFloor/:floor', userController.getRoomByFloor);
router.get('/getMaKyByHocKyVaNamBatDau/:HocKy/:NamBatDau', userController.getMaKyByHocKyVaNamBatDau);
router.post('/insertHopDong', userController.insertHopDong);
router.post('/updateRole1/:TenDangNhap', userController.updateRole1);
router.get('/getRoomById/:id', userController.getRoomById);
router.post('/updateTrangThaiHuyHopDong/:MaHD', userController.updateTrangThaiHuyHopDong);
router.post('/updateRole0/:TenDangNhap', userController.updateRole0);
router.get('/getTotalPeopleByMaPhongAndTrangThaiHopDong/:MaPhong', userController.getTotalPeopleByMaPhongAndTrangThaiHopDong);
router.post('/setNgayKetThucHopDong/:MaHD', userController.setNgayKetThucHopDong);
router.get('/getTangAndPhongByMaHopDong/:MaHD', userController.getTangAndPhongByMaHopDong);
router.get('/getRequestsByUsername/:id', userController.getRequestsByUsername)
router.post('/createRequest', userController.createRequest);
router.get('/request/:id', userController.getRequestDetail);
router.put('/request/cancel/:id', userController.cancelRequest);
module.exports = router;
