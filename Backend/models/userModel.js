const db = require('../db');

// Lấy tất cả người dùng
exports.getAllUsers = (callback) => {
  db.query('SELECT * FROM user', callback);
};

// Kiểm tra đăng nhập
exports.loginUser = (email, password, callback) => {
  db.query(
    'SELECT TenDangNhap, Password, Role, Username, NgaySinh, Cccd, GioiTinh, Sdt, Email, DiaChi, Lop, Nganh,Anh  FROM user WHERE TenDangNhap = ? AND Password = ?',
    [email, password],
    callback
  );
};
exports.getUserById = (id, callback) => {
  db.query(
    'SELECT hd.MaHD, hd.TenDangNhap, u.Username AS HoTen, u.Email, u.Sdt, u.Lop, u.Nganh, hd.MaPhong, p.Tang, p.LoaiPhong, p.Succhua, p.GiaPhong, hd.MaKy, hd.NgayDangKy, hd.NgayBatDau, hd.NgayKetThuc, hd.TienPhong, hd.TrangThai, u.Anh ' +
    'FROM HopDong hd ' +
    'JOIN `User` u ON hd.TenDangNhap = u.TenDangNhap ' +
    'JOIN Phong p ON hd.MaPhong = p.MaPhong ' +
    'WHERE hd.TenDangNhap = ?',
    [id],
    callback
  );
};
exports.getUserNotRegisteredById = (id, callback) => {
  db.query(
    'SELECT Role, TenDangNhap, Username, NgaySinh, Cccd, GioiTinh, Sdt, Email, DiaChi, Lop, Nganh, Anh FROM user WHERE TenDangNhap = ?',
    [id],
    callback
  );
}
exports.getContractByUser = (id, callback) => {
  db.query(
    'SELECT hd.MaHD, hd.TenDangNhap, hd.MaPhong, hd.MaKy, hd.NgayDangKy, hd.NgayBatDau, hd.NgayKetThuc, hd.TienPhong, hd.TrangThai, kdk.HocKy, kdk.NamBatDau, kdk.ThangBatDau, kdk.ThangKetThuc, p.Tang, p.LoaiPhong, p.SucChua, p.GiaPhong ' +
    'FROM HopDong hd ' +
    'JOIN KyDangKy kdk ON kdk.MaKy = hd.MaKy ' +  
    'JOIN Phong p ON hd.MaPhong = p.MaPhong ' +
    'WHERE hd.TenDangNhap = ?',
    [id],
    callback
  );
}
exports.getContractByContractId = (id, callback) => {
  db.query(
    'SELECT hd.MaHD, hd.TenDangNhap, hd.MaPhong, hd.MaKy, hd.NgayDangKy, hd.NgayBatDau, hd.NgayKetThuc, hd.TienPhong, hd.TrangThai, kdk.HocKy, kdk.NamBatDau, kdk.ThangBatDau, kdk.ThangKetThuc, p.Tang, p.LoaiPhong, p.SucChua, p.GiaPhong ' +
    'FROM HopDong hd ' +
    'JOIN KyDangKy kdk ON kdk.MaKy = hd.MaKy ' +  
    'JOIN Phong p ON hd.MaPhong = p.MaPhong ' +
    'WHERE hd.MaHD = ?',
    [id],
    callback
  );
}
exports.updatePassword = (id, newPassword, callback) => {
  db.query(
    'UPDATE user SET Password = ? WHERE TenDangNhap = ?',
    [newPassword, id],
    callback
  );
};

