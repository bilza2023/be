// src/routes/admin/subscriptions.js
import express from 'express';
import { PrismaClient } from '@prisma/client';
import { SubscriptionSchema } from '../../../prisma/zod.js';
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

// GET /admin/subscriptions
router.get('/', async (req, res) => {
  try {
    const filters = parseFilters(req.query);
    const items = await prisma.subscription.findMany({ where: filters });
    respondOk(res, items);
  } catch (err) {
    respondError(res, err, 500);
  }
});

// POST /admin/subscriptions
router.post('/', async (req, res) => {
  try {
    const data = validateWith(SubscriptionSchema, req.body);
    const created = await prisma.subscription.create({ data });
    logAdminAction('/admin/subscriptions', 'POST', created);
    respondCreated(res, created);
  } catch (err) {
    respondError(res, err);
  }
});

// PUT /admin/subscriptions/:id
router.put('/:id', async (req, res) => {
  try {
    const data = validateWith(SubscriptionSchema, req.body);
    const updated = await prisma.subscription.update({
      where: { id: req.params.id },
      data
    });
    logAdminAction('/admin/subscriptions', 'PUT', updated);
    respondOk(res, updated);
  } catch (err) {
    respondError(res, err);
  }
});

// DELETE /admin/subscriptions/:id
router.delete('/:id', async (req, res) => {
  try {
    await prisma.subscription.delete({ where: { id: req.params.id } });
    res.status(204).end();
  } catch (err) {
    respondError(res, err, 500);
  }
});

export default router;
