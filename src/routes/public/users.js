import express from 'express';
import bcrypt from 'bcrypt';
import { User } from '../../../mongo/models.js';
import { UserSchema } from '../../../mongo/zod.js';

import { issueToken, verifyToken } from '../../lib/jwt.js';
import { respondOk, respondCreated, respondError } from '../../utils/restUtils.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ email, passwordHash });
    const token = issueToken(user._id);

    respondCreated(res, { token });
  } catch (err) {
    respondError(res, err);
  }
});


router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const match = user && await bcrypt.compare(password, user.passwordHash);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });

    const token = issueToken(user._id);
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

    const user = await User.findById(decoded.userId).select('-passwordHash');
    respondOk(res, user);
  } catch (err) {
    respondError(res, err);
  }
});

export default router;
