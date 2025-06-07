const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../../../mongo/models');
const { UserSchema } = require('../../../mongo/zod');

const { issueToken, verifyToken } = require('../../lib/jwt');
const { respondOk, respondCreated, respondError } = require('../../utils/restUtils');


const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: 'Email already registered' });
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

module.exports = router;
