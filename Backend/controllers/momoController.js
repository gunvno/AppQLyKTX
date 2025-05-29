const db = require('../db');

exports.generateMomoQrByBillId = (req, res) => {
  const { MaHD } = req.params;

  const query = `
    SELECT hd.TongTien, h.TenDangNhap, hd.MaPhong
    FROM hoadon hd
    JOIN hopdong h ON hd.MaPhong = h.MaPhong
    WHERE hd.MaHD = ?
    LIMIT 1
  `;

  db.query(query, [MaHD], (err, results) => {
    if (err) {
      console.error('❌ Lỗi truy vấn hóa đơn:', err);
      return res.status(500).json({ success: false, message: 'Lỗi truy vấn dữ liệu' });
    }

    if (results.length === 0) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy hóa đơn' });
    }

    const { TongTien, TenDangNhap, MaPhong } = results[0];
    
    const qrLink = `https://api.vietqr.io/image/970422-0386404269-EdF1Ur7.jpg?accountName=TA%20VAN%20LONG&amount=${TongTien}&addInfo=Thanh%20Toan%20KTX%20${MaPhong}&format=text&template=compact`;
    

    return res.json({
      success: true,
      qrLink
    });
  });
};
