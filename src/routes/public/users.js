const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../../../mongo/models');
const { UserSchema } = require('../../../mongo/zod');

const { issueToken, verifyToken } = require('../../lib/jwt');
const { respondOk, respondCreated, respondError } = require('../../utils/restUtils');

const router = express.Router();

// POST /users/register
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return respondError(res, new Error('Email and password are required'), 400);
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return respondError(res, new Error('Email already registered'), 400);
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ email, passwordHash });
    const token = issueToken(user._id);

    respondCreated(res, { token });
  } catch (err) {
    respondError(res, err);
  }
});

// POST /users/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    const match = user && await bcrypt.compare(password, user.passwordHash);
    if (!match) {
      return respondError(res, new Error('Invalid credentials'), 401);
    }

    const token = issueToken(user._id);
    respondOk(res, { token });
  } catch (err) {
    respondError(res, err);
  }
});

// GET /users/me
router.get('/me', async (req, res) => {
  try {
    const auth = req.headers.authorization;
    if (!auth) {
      return respondError(res, new Error('No token provided'), 401);
    }

    const token = auth.split(' ')[1];
    const decoded = verifyToken(token);
    if (!decoded) {
      return respondError(res, new Error('Invalid token'), 401);
    }

    const user = await User.findById(decoded.userId).select('-passwordHash');
    respondOk(res, user);
  } catch (err) {
    respondError(res, err);
  }
});

module.exports = router;
