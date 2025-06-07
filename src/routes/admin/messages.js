const express = require('express');
const { Message } = require('../../../mongo/models');
const { MessageSchema } = require('../../../mongo/zod');
const {
  parseFilters,
  validateWith,
  respondOk,
  respondCreated,
  respondError,
  respondNotFound
} = require('../../utils/restUtils');

const router = express.Router();

// GET /admin/messages
router.get('/', async (req, res) => {
  try {
    const filters = parseFilters(req.query);
    const items = await Message.find(filters);
    respondOk(res, items);
  } catch (err) {
    respondError(res, err, 500);
  }
});

// POST /admin/messages
router.post('/', async (req, res) => {
  try {
    const data = validateWith(MessageSchema, req.body);
    const created = await Message.create(data);
    respondCreated(res, created);
  } catch (err) {
    respondError(res, err, 400);
  }
});

// PUT /admin/messages/:id
router.put('/:id', async (req, res) => {
  try {
    const data = validateWith(MessageSchema, req.body);
    const updated = await Message.findByIdAndUpdate(req.params.id, data, { new: true });
    respondOk(res, updated);
  } catch (err) {
    respondError(res, err, 400);
  }
});

// DELETE /admin/messages/:id
router.delete('/:id', async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    respondError(res, err, 500);
  }
});

module.exports = router;
