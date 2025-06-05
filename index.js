import express from 'express';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import messageRoutes from './src/routes/messages.js';
import userRoutes from './src/routes/users.js';
import subscriptionRoutes from './src/routes/subscriptions.js';
import cors from 'cors';
import tcodeRoutes from './src/routes/tcodes.js';
import adminRoutes from './src/routes/admin/index.js';

dotenv.config();
const app = express();

app.use(express.json());

// Attach routes
app.use(cors());
app.use('/users', userRoutes);
app.use('/messages', messageRoutes);
app.use('/subscriptions', subscriptionRoutes);
app.use('/tcodes', tcodeRoutes);
app.use('/admin', adminRoutes);
// Health check
app.get('/', (req, res) => {
  res.send('Workshop backend is running');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
