const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'quanlyktx'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Đã kết nối database!');
});

module.exports = db;
