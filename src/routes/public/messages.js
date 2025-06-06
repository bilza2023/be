const express = require('express');
const { Message } = require('../../../mongo/models');
const { MessageSchema } = require('../../../mongo/zod');
const { validateWith, respondCreated, respondError } = require('../../utils/restUtils');


const router = express.Router();

// POST /messages
router.post('/', async (req, res) => {
  try {
    const data = validateWith(MessageSchema, req.body);
    const created = await Message.create(data);
    respondCreated(res, created);
  } catch (err) {
    respondError(res, err);
  }
});

module.exports = router;
