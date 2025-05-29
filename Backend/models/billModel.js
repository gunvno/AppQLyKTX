const db = require('../db');

// Lấy danh sách hóa đơn theo tên đăng nhập
exports.getBillsByUsername = (username, callback) => {
  const query = `
    SELECT DISTINCT hd.MaHD, hd.NgayXuatHD, hd.TongTien, hd.TrangThai
    FROM hoadon hd
    JOIN hopdong h ON hd.MaPhong = h.MaPhong
    WHERE h.TenDangNhap = ?
  `;
  db.query(query, [username], callback);
};

// Lấy thông tin người dùng liên quan tới hóa đơn
exports.getUserInfoByBillId = (billId, callback) => {
  const query = `
    SELECT u.TenDangNhap, u.Username, u.DiaChi
    FROM user u
    JOIN hopdong h ON h.TenDangNhap = u.TenDangNhap
    JOIN hoadon hd ON hd.MaPhong = h.MaPhong
    WHERE hd.MaHD = ? LIMIT 1
  `;
  db.query(query, [billId], callback);
};

// Lấy dịch vụ kèm theo hóa đơn
exports.getServicesByBillId = (billId, callback) => {
  const query = `
    SELECT dv.TenDV, hdv.TienDV
    FROM hoadon_dichvu hdv
    JOIN dichvu dv ON dv.MaDV = hdv.MaDV
    WHERE hdv.MaHD = ?
  `;
  db.query(query, [billId], callback);
};

// Lấy tổng tiền của hóa đơn
exports.getTotalByBillId = (billId, callback) => {
  const query = `SELECT TongTien FROM hoadon WHERE MaHD = ?`;
  db.query(query, [billId], callback);
};

exports.updateBillStatus = (MaHD, TrangThai, callback) => {
  db.query(
    'UPDATE hoadon SET TrangThai = ? WHERE MaHD = ?',
    [TrangThai, MaHD],
    (err, result) => {
      if (err) return callback(err);
      callback(null, result);
    }
  );
};

exports.getBillsByUserId = (username, callback) => {
  const query = `
    SELECT hd.MaHD, hd.NgayXuatHD, hd.TongTien, hd.TrangThai
    FROM hoadon hd
    JOIN hopdong h ON hd.MaPhong = h.MaPhong
    WHERE h.TenDangNhap = ?
    ORDER BY hd.NgayXuatHD DESC
  `;
  db.query(query, [username], callback);
};

