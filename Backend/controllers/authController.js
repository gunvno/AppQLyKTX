const userModel = require('../models/userModel');

exports.login = (req, res) => {
  const { TenDangNhap, Password } = req.body;

  // Kiểm tra dữ liệu đầu vào
  if (!TenDangNhap || !Password) {
    return res.status(400).json({ success: false, message: 'Vui lòng nhập tên đăng nhập và mật khẩu' });
  }

  userModel.loginUser(TenDangNhap, Password, (err, result) => {
    if (err) {
      console.error('Lỗi server:', err);
      return res.status(500).json({ success: false, message: 'Lỗi server', error: err });
    }

    if (result.length > 0) {
      const user = result[0]; // Lấy thông tin người dùng đầu tiên
      res.status(200).json({ success: true, message: 'Đăng nhập thành công', user });
    } else {
      res.status(401).json({ success: false, message: 'Email hoặc mật khẩu không đúng' });
    }
  });
};