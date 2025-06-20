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
    'SELECT hd.MaHD, hd.TenDangNhap, u.Username AS HoTen, u.Email, u.Sdt, u.Lop, u.Nganh, hd.MaPhong, p.Tang, p.LoaiPhong, p.Succhua, p.GiaPhong, hd.MaKy, hd.NgayDangKy, hd.NgayBatDau, hd.NgayKetThuc, hd.TienPhong, hd.TrangThai, u.Anh, u.Role,u.Password ' +
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
    'SELECT Role, TenDangNhap, Username, NgaySinh, Cccd, GioiTinh, Sdt, Email, DiaChi, Lop, Nganh, Anh, Password FROM user WHERE TenDangNhap = ?',
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
exports.getRequestById = (id, callback) => {
  db.query(
    'SELECT * FROM YeuCau WHERE TenDangNhap = ?',
    [id],
    callback
  );
};
exports.getPasswordAndEmailById = (id, callback) => {
  db.query(
    'SELECT Password, Email, Username FROM user WHERE TenDangNhap = ?',
    [id],
    callback
  );
}
exports.updatePasswordById = (id, newPassword, callback) => {
  db.query(
    'UPDATE user SET Password = ? WHERE TenDangNhap = ?',
    [newPassword, id],
    callback
  );
}
exports.getRoomByFloor = (floor, callback) => {
  const floorNum = Number(floor);
  if (isNaN(floorNum)) {
    // Trả về lỗi nếu không phải số
    return callback(new Error('Tầng không hợp lệ'), []);
  }
  db.query('SELECT * FROM Phong WHERE Tang = ?', [floorNum], callback);
};
exports.getMaKyByHocKyVaNamBatDau = (hocKy, namBatDau, callback) => {
  db.query(
    'SELECT MaKy FROM KyDangKy WHERE HocKy = ? AND NamBatDau = ?',
    [hocKy, namBatDau],
    callback
  );
}
exports.insertHopDong = (hopDong, callback) => {
  const { TenDangNhap, MaPhong, MaKy, NgayDangKy, NgayBatDau, NgayKetThuc, TienPhong } = hopDong;
  db.query(
    'INSERT INTO HopDong (TenDangNhap, MaPhong, MaKy, NgayDangKy, NgayBatDau, NgayKetThuc, TienPhong, TrangThai) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [TenDangNhap, MaPhong, MaKy, NgayDangKy, NgayBatDau, NgayKetThuc, TienPhong, "Đang có hiệu lực"],
    callback
  );
}

exports.updateRole1 = (TenDangNhap, callback) => {
  db.query(
    'UPDATE user SET Role = 1 WHERE TenDangNhap = ?',
    [TenDangNhap], callback
  );
} 
exports.updateRole0 = (TenDangNhap, callback) => {
  db.query(
    'UPDATE user SET Role = 0 WHERE TenDangNhap = ?',
    [TenDangNhap], callback
  );
}
exports.getRoomById = (id, callback) => {
  db.query(
    'SELECT * FROM Phong WHERE MaPhong = ?',
    [id],
    callback
  );
}
exports.updateTrangThaiHuyHopDong = (MaHD, callback) => {
  db.query(
    'UPDATE HopDong SET TrangThai = ? WHERE MaHD = ?',
    ["Hết hạn", MaHD],
    callback
  );
}
exports.getTotalPeopleByMaPhongAndTrangThaiHopDong = (MaPhong, callback) => {
  db.query(
    'SELECT COUNT(DISTINCT TenDangNhap) AS totalPeople FROM HopDong WHERE MaPhong = ? AND TrangThai = ?',
    [MaPhong, "Đang có hiệu lực"],
    callback
  );
};
exports.setNgayKetThucHopDong = (MaHD, NgayKetThuc, callback) => {
  db.query(
    'UPDATE HopDong SET NgayKetThuc = ? WHERE MaHD = ?',
    [NgayKetThuc, MaHD],
    callback
  );
}
exports.getTangAndPhongByMaHopDong = (MaHD, callback) => {
  db.query(
    'SELECT p.Tang, p.MaPhong FROM HopDong hd JOIN Phong p ON hd.MaPhong = p.MaPhong WHERE hd.MaHD = ?',
    [MaHD],
    callback
  );
}
exports.getRequestsByUsername = (id, callback) => {
  const sql = `
    SELECT yc.MaYeuCau, yc.TenDangNhap, yc.TenYeuCau, yc.NgayGui, yc.TrangThai,
           ctyc.NgayThang, ctyc.LyDo, ctyc.HinhAnh
    FROM YeuCau yc
    LEFT JOIN ChiTietYeuCau ctyc ON yc.MaYeuCau = ctyc.MaYeuCau
    WHERE yc.TenDangNhap = ?
  `;
  db.query(sql, [id], callback);
};
// Thêm mới yêu cầu sửa phòng
exports.createRequest = (requestData, callback) => {
  const { TenDangNhap, TenYeuCau, NgayThang, LyDo, HinhAnh } = requestData;

  const sql1 = `
    INSERT INTO YeuCau (TenDangNhap, TenYeuCau, NgayGui, TrangThai)
    VALUES (?, ?, NOW(), 'Đã gửi')
  `;

  db.query(sql1, [TenDangNhap, TenYeuCau], (err, result) => {
    if (err) return callback(err);

    const maYeuCau = result.insertId;

    const sql2 = `
      INSERT INTO ChiTietYeuCau (MaYeuCau, NgayThang, LyDo, HinhAnh)
      VALUES (?, ?, ?, ?)
    `;

    db.query(sql2, [maYeuCau, NgayThang, LyDo, HinhAnh], (err2) => {
      if (err2) return callback(err2);

      callback(null, { success: true, message: 'Gửi yêu cầu thành công' });
    });
  });
};

// Lấy chi tiết yêu cầu theo ID
exports.getRequestDetail = (id, callback) => {
  const sqlYeuCau = 'SELECT * FROM YeuCau WHERE MaYeuCau = ?';
  const sqlChiTiet = 'SELECT * FROM ChiTietYeuCau WHERE MaYeuCau = ?';

  db.query(sqlYeuCau, [id], (err, yeuCau) => {
    if (err) return callback(err);
    db.query(sqlChiTiet, [id], (err2, chiTiet) => {
      if (err2) return callback(err2);
      callback(null, { yeuCau: yeuCau[0], chiTiet: chiTiet[0] });
    });
  });
};

// Hủy yêu cầu theo ID
exports.cancelRequest = (id, callback) => {
  const sql = "UPDATE YeuCau SET TrangThai = N'Đã hủy' WHERE MaYeuCau = ?";
  db.query(sql, [id], callback);
};




