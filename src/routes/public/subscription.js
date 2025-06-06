import express from 'express';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '../../lib/jwt.js';
import { respondOk, respondError } from '../../utils/restUtils.js';

const prisma = new PrismaClient();
const router = express.Router();

router.get('/subscription', async (req, res) => {
  try {
    const auth = req.headers.authorization;
    if (!auth) return res.status(401).json({ error: 'No token provided' });

    const token = auth.split(' ')[1];
    const decoded = verifyToken(token);
    if (!decoded) return res.status(401).json({ error: 'Invalid token' });

    const { tcode } = req.query;
    const match = await prisma.subscription.findFirst({
      where: { userId: decoded.userId, tcodeId: tcode, status: 'active' }
    });

    respondOk(res, { access: !!match });
  } catch (err) {
    respondError(res, err);
  }
});

export default router;
