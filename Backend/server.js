const express = require('express');
const cors = require('cors');
const app = express();
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

app.use(cors());
app.use(express.json()); // Middleware để xử lý JSON

// Gắn route
app.use('/auth', authRoutes);
app.use('/users', userRoutes); // Gắn route /users

app.listen(3000, () => {
  console.log('Server đang chạy ở port 3000');
});