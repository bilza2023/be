import express from 'express';
import { Subscription } from '../../../mongo/models.js';
import { verifyToken }  from '../../lib/jwt.js';
import { respondOk, respondError } from '../../utils/restUtils.js';

const router = express.Router();

// GET /me/subscription?tcode=xyz
router.get('/subscription', async (req, res) => {
  try {
    const auth = req.headers.authorization;
    if (!auth) return res.status(401).json({ error: 'No token provided' });

    const token = auth.split(' ')[1];
    const decoded = verifyToken(token);
    if (!decoded) return res.status(401).json({ error: 'Invalid token' });

    const { tcode } = req.query;

    const match = await Subscription.findOne({
      userId: decoded.userId,
      tcodeId: tcode,
      status: 'active'
    });

    respondOk(res, { access: !!match });
  } catch (err) {
    respondError(res, err);
  }
});

export default router;
