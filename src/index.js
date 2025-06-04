import express from 'express';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

import userRoutes from './routes/users.js';
import tcodeRoutes from './routes/tcodes.js';
import subscriptionRoutes from './routes/subscriptions.js';

dotenv.config();
const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// Attach routes
app.use('/users', userRoutes);
app.use('/tcodes', tcodeRoutes);
app.use('/subscriptions', subscriptionRoutes);

// Health check
app.get('/', (req, res) => {
  res.send('Workshop backend is running');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
