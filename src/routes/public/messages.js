import express from 'express';
import { Message }       from '../../../mongo/models.js';
import { MessageSchema } from '../../../mongo/zod.js';
import { validateWith, respondCreated, respondError } from '../../utils/restUtils.js';

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

export default router;
