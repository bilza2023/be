const express = require('express');
const { Subscription } = require('../../../mongo/models');
const { verifyToken } = require('../../lib/jwt');
const { respondOk, respondError } = require('../../utils/restUtils');


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

module.exports = router;
