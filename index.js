import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import adminRoutes from './src/routes/admin/index.js';
import publicRoutes from './src/routes/public/index.js';

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

if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}


export default app;
