const express = require('express');
const cors = require('cors');
const app = express();
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const billRoutes = require('./routes/bill');

app.use(cors());
app.use(express.json({limit: '10mb'})); // Middleware để xử lý JSON
app.use(express.urlencoded({ extended: true, limit: '10mb' })); // Middleware để xử lý URL-encoded
// Gắn route
app.use('/auth', authRoutes);
app.use('/users', userRoutes); // Gắn route /users
app.use('/bills', billRoutes);

app.listen(3000, () => {
  console.log('Server đang chạy ở port 3000');
});