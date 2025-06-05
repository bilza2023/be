// src/routes/admin/tcodes.js
import express from 'express';
import { PrismaClient } from '@prisma/client';
import { TcodeSchema } from '../../../prisma/zod.js';
import {
  parseFilters,
  validateWith,
  respondOk,
  respondCreated,
  respondError,
  respondNotFound,
  logAdminAction
} from '../../utils/restUtils.js';

const prisma = new PrismaClient();
const router = express.Router();

// GET /admin/tcodes
router.get('/', async (req, res) => {
  try {
    const filters = parseFilters(req.query);
    const items = await prisma.tcode.findMany({ where: filters });
    respondOk(res, items);
  } catch (err) {
    respondError(res, err, 500);
  }
});

// POST /admin/tcodes
router.post('/', async (req, res) => {
  try {
    const data = validateWith(TcodeSchema, req.body);
    const created = await prisma.tcode.create({ data });
    logAdminAction('/admin/tcodes', 'POST', created);
    respondCreated(res, created);
  } catch (err) {
    respondError(res, err);
  }
});

// PUT /admin/tcodes/:id
router.put('/:id', async (req, res) => {
  try {
    const data = validateWith(TcodeSchema, req.body);
    const updated = await prisma.tcode.update({
      where: { id: req.params.id },
      data
    });
    logAdminAction('/admin/tcodes', 'PUT', updated);
    respondOk(res, updated);
  } catch (err) {
    respondError(res, err);
  }
});

// DELETE /admin/tcodes/:id
router.delete('/:id', async (req, res) => {
  try {
    await prisma.tcode.delete({ where: { id: req.params.id } });
    res.status(204).end();
  } catch (err) {
    respondError(res, err, 500);
  }
});

export default router;
