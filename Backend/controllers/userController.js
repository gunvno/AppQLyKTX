const userModel = require('../models/userModel');
const sendMail = require('../utils/mailer');
exports.getAllUsers = (req, res) => {
  userModel.getAllUsers((err, results) => {
    if (err) return res.status(500).json({ message: 'Lỗi server', error: err });
    res.json(results);
  });
};

exports.getUserById = (req, res) => {
  const { id } = req.params;

  userModel.getUserById(id, (err, result) => {
    if (err) {
      console.error('Lỗi khi lấy thông tin người dùng:', err);
      return res.status(500).json({ success: false, message: 'Lỗi server' });
    }

    if (result.length > 0) {
      res.status(200).json({ success: true, user: result[0] });
    } else {
      res.status(404).json({ success: false, message: 'Không tìm thấy người dùng' });
    }
  });
};


exports.getUserNotRegisteredById = (req, res) => {
  const { id } = req.params;

  userModel.getUserNotRegisteredById(id, (err, result) => {
    if (err) {
      console.error('Lỗi khi lấy thông tin người dùng:', err);
      return res.status(500).json({ success: false, message: 'Lỗi server' });
    }

    if (result.length > 0) {
      res.status(200).json({ success: true, user: result[0] });
    } else {
      res.status(404).json({ success: false, message: 'Không tìm thấy người dùng' });
    }
  });
};

exports.getContractByUser = (req, res) => {
  const { id } = req.params;

  userModel.getContractByUser(id, (err, result) => {
    if (err) {
      console.error('Lỗi khi lấy thông tin hợp đồng:', err);
      return res.status(500).json({ success: false, message: 'Lỗi server' });
    }

    if (result.length > 0) {
      res.status(200).json({ success: true, contracts: result });
    } 
  });
}
exports.getContractByContractId = (req, res) => {
  const { id } = req.params;

  userModel.getContractByContractId(id, (err, result) => {
    if (err) {
      console.error('Lỗi khi lấy thông tin hợp đồng:', err);
      return res.status(500).json({ success: false, message: 'Lỗi server' });
    }

    if (result.length > 0) {
      res.status(200).json({ success: true, contracts: result });
    } else {
      res.status(404).json({ success: false, message: 'Không tìm thấy hợp đồng' });
    }
  });
}
exports.updatePassword = (req, res) => {
  const { id } = req.params;
  const { newPassword } = req.body;

  userModel.updatePassword(id, newPassword, (err, result) => {
    if (err) {
      console.error('Lỗi khi cập nhật mật khẩu:', err);
      return res.status(500).json({ success: false, message: 'Lỗi server' });
    }

    if (result.affectedRows > 0) {
      res.status(200).json({ success: true, message: 'Cập nhật mật khẩu thành công' });
    } else {
      res.status(404).json({ success: false, message: 'Không tìm thấy người dùng' });
    }
  });
}
exports.getRequestById = (req, res) => {
  const { id } = req.params;

  userModel.getRequestById(id, (err, result) => {
    if (err) {
      console.error('Lỗi khi lấy thông tin yêu cầu:', err);
      return res.status(500).json({ success: false, message: 'Lỗi server' });
    }

    if (result.length > 0) {
      res.status(200).json({ success: true, request: result[0] });
    } else {
      res.status(404).json({ success: false, message: 'Không tìm thấy yêu cầu' });
    }
  });
}
exports.sendPassword = (TenDangNhap, callback) => {
  userModel.getPasswordAndEmailById(TenDangNhap, (err, result) => {
    if (err) {
      console.error('Lỗi truy vấn:', err);
      return callback({ success: false, message: 'Lỗi server' });
    }
    if (!result || result.length === 0) {
      console.error('Không tìm thấy user với TenDangNhap:', TenDangNhap);
      return callback({ success: false, message: 'Không tìm thấy người dùng' });
    }

    const { Email } = result[0];
    const newPassword = Math.random().toString(36).slice(-8);

    userModel.updatePassword(TenDangNhap, newPassword, (err, updateResult) => {
      if (err || updateResult.affectedRows === 0) {
        console.error('Lỗi khi cập nhật mật khẩu:', err);
        return callback({ success: false, message: 'Lỗi server' });
      }

      // Gửi email với mật khẩu mới
      require('../utils/mailer')(Email, 'Mật khẩu mới', `Mật khẩu mới của bạn là: ${newPassword}`);
      callback({ success: true, message: 'Mật khẩu đã được gửi đến email của bạn' });
    });
  });
};
exports.getRoomByFloor = (req, res) => {
  const { floor } = req.params;

  userModel.getRoomByFloor(floor, (err, result) => {
    if (err) {
      console.error('Lỗi khi lấy thông tin phòng:', err);
      return res.status(500).json({ success: false, message: 'Lỗi server' });
    }

    if (result.length > 0) {
      res.status(200).json({ success: true, rooms: result });
    } else {
      res.status(404).json({ success: false, message: 'Không tìm thấy phòng' });
    }
  });
}
exports.getMaKyByHocKyVaNamBatDau = (req, res) => {
  const { HocKy, NamBatDau } = req.params;
  userModel.getMaKyByHocKyVaNamBatDau(HocKy, NamBatDau, (err, result) => {
    if (err) {
      console.error('Lỗi truy vấn:', err);
      return res.status(500).json({ success: false, message: 'Lỗi server' });
    }
    if (result.length > 0) {
      res.json({ success: true, MaKy: result[0].MaKy });
    } else {
      res.json({ success: false, message: 'Không tìm thấy MaKy phù hợp' });
    }
  });
};
exports.insertHopDong = (req, res) => {
  const hopDong = req.body;

  userModel.insertHopDong(hopDong, (err, result) => {
    if (err) {
      console.error('Lỗi khi thêm hợp đồng:', err);
      return res.status(500).json({ success: false, message: 'Lỗi server' });
    }

    if (result.affectedRows > 0) {
      res.status(201).json({ success: true, message: 'Hợp đồng đã được thêm thành công' });
    } else {
      res.status(400).json({ success: false, message: 'Không thể thêm hợp đồng' });
    }
  });
};
exports.updateRole1 = (req, res) => {
  const { TenDangNhap } = req.params;

  userModel.updateRole1(TenDangNhap, (err, result) => {
    if (err) {
      console.error('Lỗi khi cập nhật vai trò:', err);
      return res.status(500).json({ success: false, message: 'Lỗi server' });
    }

    if (result.affectedRows > 0) {
      res.status(200).json({ success: true, message: 'Cập nhật vai trò thành công' });
    } else {
      res.status(404).json({ success: false, message: 'Không tìm thấy người dùng' });
    }
  });
}
exports.getRoomById = (req, res) => {
  const { id } = req.params;

  userModel.getRoomById(id, (err, result) => {
    if (err) {
      console.error('Lỗi khi lấy thông tin phòng:', err);
      return res.status(500).json({ success: false, message: 'Lỗi server' });
    }

    if (result.length > 0) {
      res.status(200).json({ success: true, room: result[0] });
    } else {
      res.status(404).json({ success: false, message: 'Không tìm thấy phòng' });
    }
  });
}
