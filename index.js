const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const connectToMongo = require('./mongo/index');
const adminRoutes = require('./src/routes/admin/index');
const publicRoutes = require('./src/routes/public/index');

dotenv.config();
const app = express();

///////////////////// CORS /////////////////////
const corsOptions = {
  origin: ['http://localhost:5173', 'https://taleem.help'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

///////////////////// Middleware /////////////////////
app.use(express.json());
app.use(cookieParser());

///////////////////// Routes /////////////////////
app.use('/admin', adminRoutes);
app.use('/', publicRoutes);

///////////////////// Health /////////////////////
app.get('/', (req, res) => {
  res.send('Workshop backend is running');
});

///////////////////// Start Server /////////////////////
if (process.env.NODE_ENV !== 'test') {
  connectToMongo().then(() => {
    const PORT = process.env.PORT || 5000; // ← updated default
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  });
}

module.exports = { app };
