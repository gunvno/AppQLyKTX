const userModel = require('../models/userModel');

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
  console.log('ID nhận được từ frontend:', id); // Log giá trị id để kiểm tra

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
    } else {
      res.status(404).json({ success: false, message: 'Không tìm thấy hợp đồng' });
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