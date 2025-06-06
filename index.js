const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');

const connectToMongo = require('./mongo/index');

const adminRoutes = require('./src/routes/admin/index');
const publicRoutes = require('./src/routes/public/index');


dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

// Attach routes
app.use('/admin', adminRoutes);
app.use('/', publicRoutes); // Public API base

// Health check
app.get('/', (req, res) => {
  res.send('Workshop backend is running');
});

// Always connect to Mongo
connectToMongo().then(() => {
  if (process.env.NODE_ENV !== 'test') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  }
});



module.exports =  {app};
