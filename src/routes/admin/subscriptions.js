// src/routes/admin/subscriptions.js
const express = require('express');
const { Subscription } = require('../../../mongo/models');
const { SubscriptionSchema } = require('../../../mongo/zod');
const {
  parseFilters,
  validateWith,
  respondOk,
  respondCreated,
  respondError,
  logAdminAction
} = require('../../utils/restUtils');


const router = express.Router();

// GET /admin/subscriptions
router.get('/', async (req, res) => {
  try {
    const filters = parseFilters(req.query);
    const items = await Subscription.find(filters);
    respondOk(res, items);
  } catch (err) {
    respondError(res, err, 500);
  }
});

// POST /admin/subscriptions
router.post('/', async (req, res) => {
  try {
    const data = validateWith(SubscriptionSchema, req.body);
    const created = await Subscription.create(data);
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
    const updated = await Subscription.findByIdAndUpdate(req.params.id, data, { new: true });
    logAdminAction('/admin/subscriptions', 'PUT', updated);
    respondOk(res, updated);
  } catch (err) {
    respondError(res, err);
  }
});

// DELETE /admin/subscriptions/:id
router.delete('/:id', async (req, res) => {
  try {
    await Subscription.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    respondError(res, err, 500);
  }
});

module.exports = router;
