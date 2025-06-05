// src/routes/admin/messages.js
import express from 'express';
import { PrismaClient } from '@prisma/client';
import { MessageSchema } from '../../../prisma/zod.js';
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

// GET /admin/messages
router.get('/', async (req, res) => {
  try {
    const filters = parseFilters(req.query);
    const items = await prisma.message.findMany({ where: filters });
    respondOk(res, items);
  } catch (err) {
    respondError(res, err, 500);
  }
});

// POST /admin/messages
router.post('/', async (req, res) => {
  try {
    const data = validateWith(MessageSchema, req.body);
    const created = await prisma.message.create({ data });
    // logAdminAction('/admin/messages', 'POST', created);
    respondCreated(res, created);
  } catch (err) {
    respondError(res, err);
  }
});

// PUT /admin/messages/:id
router.put('/:id', async (req, res) => {
  try {
    const data = validateWith(MessageSchema, req.body);
    const updated = await prisma.message.update({
      where: { id: req.params.id },
      data
    });
    // logAdminAction('/admin/messages', 'PUT', updated);
    respondOk(res, updated);
  } catch (err) {
    respondError(res, err);
  }
});

// DELETE /admin/messages/:id
router.delete('/:id', async (req, res) => {
  try {
    await prisma.message.delete({ where: { id: req.params.id } });
    res.status(204).end();
  } catch (err) {
    respondError(res, err, 500);
  }
});

export default router;
