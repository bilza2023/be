// src/routes/admin/users.js
import express from 'express';
import { User } from '../../../mongo/models.js';
import {
  parseFilters,
  respondOk,
  respondError
} from '../../utils/restUtils.js';

const router = express.Router();

// GET /admin/users
router.get('/', async (req, res) => {
  try {
    const filters = parseFilters(req.query);
    const items = await User.find(filters);
    respondOk(res, items);
  } catch (err) {
    respondError(res, err, 500);
  }
});

export default router;
