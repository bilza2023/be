// src/routes/admin/users.js
import express from 'express';
import { PrismaClient } from '@prisma/client';
// import { UserSchema } from '../../prisma/zod.js';
import {
  parseFilters,
  validateWith,
  respondOk,
  respondError
} from '../../utils/restUtils.js';

const prisma = new PrismaClient();
const router = express.Router();

// GET /admin/users
router.get('/', async (req, res) => {
  try {
    const filters = parseFilters(req.query);
    const items = await prisma.user.findMany({ where: filters });
    respondOk(res, items);
  } catch (err) {
    respondError(res, err, 500);
  }
});

export default router;
