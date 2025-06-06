
import express from 'express';
import { PrismaClient } from '@prisma/client';
import { UserSchema } from '../../../prisma/zod.js';
import { issueToken, verifyToken } from '../../lib/jwt.js';
import { respondOk, respondCreated, respondError } from '../../utils/restUtils.js';

const prisma = new PrismaClient();
const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const data = UserSchema.omit({ id: true, createdAt: true }).parse(req.body);
    const user = await prisma.user.create({ data: { ...data, passwordHash: data.passwordHash } });
    const token = issueToken(user.id);
    respondCreated(res, { token });
  } catch (err) {
    respondError(res, err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || user.passwordHash !== password)
      return res.status(401).json({ error: 'Invalid credentials' });
    const token = issueToken(user.id);
    respondOk(res, { token });
  } catch (err) {
    respondError(res, err);
  }
});

router.get('/me', async (req, res) => {
  try {
    const auth = req.headers.authorization;
    if (!auth) return res.status(401).json({ error: 'No token provided' });
    const token = auth.split(' ')[1];
    const decoded = verifyToken(token);
    if (!decoded) return res.status(401).json({ error: 'Invalid token' });
    const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
    respondOk(res, user);
  } catch (err) {
    respondError(res, err);
  }
});

export default router;
