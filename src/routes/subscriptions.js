import express from 'express';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const router = express.Router();
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your-dev-secret';

// Middleware to extract user from token
function authenticate(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'No token provided' });

  const token = auth.split(' ')[1];
  try {
    const { userId } = jwt.verify(token, JWT_SECRET);
    req.userId = userId;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

// Get subscriptions for current user
router.get('/', authenticate, async (req, res) => {
  const subs = await prisma.subscription.findMany({
    where: { userId: req.userId }
  });
  res.json(subs);
});

// Subscribe to a tcode
// router.post('/', authenticate, async (req, res) => {
//   const { tcodeId, subscriptionType, durationDays } = req.body;
//   const startDate = new Date();

//   const sub = await prisma.subscription.create({
//     data: {
//       userId: req.userId,
//       tcodeId,
//       subscriptionType,
//       startDate,
//       durationDays,
//       status: 'active'
//     }
//   });

//   res.json(sub);
// });

export default router;
