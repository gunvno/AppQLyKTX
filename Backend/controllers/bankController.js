const db = require('../db');
const VietQR = require('vietqr'); // Import thư viện vietqr

// Khởi tạo VietQR với clientID và apiKey của bạn
// THAY THE 'YOUR_CLIENT_ID' VA 'YOUR_API_KEY' BANG THONG TIN THUC TE CUA BAN
let vietQR = new VietQR({
  clientID: 'YOUR_CLIENT_ID',
  apiKey: 'YOUR_API_KEY'
});

// Hàm hỗ trợ tạo chuỗi TLV
const createTLV = (tag, value) => {
  const length = value.length.toString().padStart(2, '0');
  return `${tag}${length}${value}`;
};

// Hàm hỗ trợ tính CRC16 (CCITT-FALSE)
// Credit: https://gist.github.com/jshawl/6109320
function crc16(data) {
  let crc = 0xFFFF;
  for (let i = 0; i < data.length; i++) {
    crc ^= data.charCodeAt(i);
    for (let j = 0; j < 8; j++) {
      if ((crc & 0x0001) === 0x0001) {
        crc = (crc >> 1) ^ 0xA001;
      } else {
        crc >>= 1;
      }
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, '0');
}

exports.generateBankQrDataByBillId = (req, res) => {
  const { MaHD } = req.params;

  const query = `
    SELECT hd.TongTien, h.TenDangNhap
    FROM hoadon hd
    JOIN hopdong h ON hd.MaPhong = h.MaPhong
    WHERE hd.MaHD = ?
    LIMIT 1
  `;

  db.query(query, [MaHD], async (err, results) => { // Sử dụng async ở đây
    if (err) {
      console.error('❌ Lỗi truy vấn hóa đơn:', err);
      return res.status(500).json({ success: false, message: 'Lỗi truy vấn dữ liệu' });
    }

    if (results.length === 0) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy hóa đơn' });
    }

    const { TongTien, TenDangNhap } = results[0];

    const bankInfo = {
      accountNo: '0386404269', // Số tài khoản MB Bank của bạn
      accountName: TenDangNhap, // Tên người nhận (có thể lấy từ TenDangNhap hoặc thông tin khác)
      acqId: '970422', // Mã ngân hàng MB Bank (BIN)
      amount: TongTien, // Số tiền
      addInfo: `TT KTX ${MaHD} - ${TenDangNhap}`, // Nội dung chuyển khoản
      format: 'text', // Định dạng trả về (text cho chuỗi payload QR)
      template: 'compact' // Template QR (thử compact)
    };

    try {
      // Sử dụng thư viện vietqr để tạo payload
      const qrPayload = await vietQR.generateQR(bankInfo); // Sử dụng await vì generateQR trả về Promise

      // Trả về payload QR trong trường qrPayload
      res.status(200).json({ success: true, qrPayload: qrPayload });
    } catch (qrError) {
      console.error('❌ Lỗi khi tạo payload VietQR:', qrError);
      res.status(500).json({ success: false, message: 'Lỗi khi tạo mã QR VietQR', error: qrError.message });
    }
  });
}; 