// src/routes/admin/tcodes.js
const express = require('express');
const { Tcode } = require('../../../mongo/models');
const { TcodeSchema } = require('../../../mongo/zod');
const {
  parseFilters,
  validateWith,
  respondOk,
  respondCreated,
  respondError,
  respondNotFound,
  logAdminAction
} = require('../../utils/restUtils');

const router = express.Router();

// GET /admin/tcodes
router.get('/', async (req, res) => {
  try {
    const filters = parseFilters(req.query);
    const items = await Tcode.find(filters);
    respondOk(res, items);
  } catch (err) {
    respondError(res, err, 500);
  }
});

// POST /admin/tcodes
router.post('/', async (req, res) => {
  try {
    const data = validateWith(TcodeSchema, req.body);
    const created = await Tcode.create(data);
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
    const updated = await Tcode.findByIdAndUpdate(req.params.id, data, { new: true });
    logAdminAction('/admin/tcodes', 'PUT', updated);
    respondOk(res, updated);
  } catch (err) {
    respondError(res, err);
  }
});

// DELETE /admin/tcodes/:id
router.delete('/:id', async (req, res) => {
  try {
    await Tcode.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    respondError(res, err, 500);
  }
});

module.exports  =  router;
