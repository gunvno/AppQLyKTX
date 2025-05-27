const BillModel = require('../models/billModel');

exports.getBillsByUsername = (req, res) => {
  const { username } = req.params;
  BillModel.getBillsByUsername(username, (err, result) => {
    if (err) return res.status(500).json({ message: 'Lỗi truy vấn hóa đơn', error: err });
    res.json(result);
  });
};

exports.getBillDetail = (req, res) => {
  const { id } = req.params;
  BillModel.getUserInfoByBillId(id, (err1, userRows) => {
    if (err1) return res.status(500).json({ error: 'Lỗi truy vấn thông tin người dùng' });

    BillModel.getServicesByBillId(id, (err2, serviceRows) => {
      if (err2) return res.status(500).json({ error: 'Lỗi truy vấn dịch vụ' });

      BillModel.getTotalByBillId(id, (err3, totalRows) => {
        if (err3) return res.status(500).json({ error: 'Lỗi truy vấn tổng tiền' });

        res.json({
          user: userRows[0],
          services: serviceRows,
          total: totalRows[0]?.TongTien || 0
        });
      });
    });
  });
};

exports.updateBillStatus = (req, res) => {
  const MaHD = req.params.id;       
  const TrangThai = req.body.TrangThai;

  BillModel.updateBillStatus(MaHD, TrangThai, (err, result) => {
    if (err) {
      console.error('Lỗi update:', err);
      return res.status(500).json({ error: 'Lỗi cập nhật trạng thái hóa đơn' });
    }
    res.json({ message: 'Cập nhật trạng thái thành công' });
  });
};


exports.getBillsByUserId = (req, res) => {
  const username = req.params.username;
  console.log('[SERVER] Nhận yêu cầu getBillsByUserId với:', username);

  BillModel.getBillsByUserId(username, (err, result) => {
    if (err) {
      console.error('[SERVER] Lỗi lấy hóa đơn:', err);
      return res.status(500).send('❌ Lỗi truy vấn DB');
    }

    console.log('[SERVER] Dữ liệu trả về:', result);
    res.json(result); // trả JSON
  });
};


