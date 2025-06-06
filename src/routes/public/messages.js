
import express from 'express';
import { PrismaClient } from '@prisma/client';
import { MessageSchema } from '../../../prisma/zod.js';
import { validateWith, respondCreated, respondError } from '../../utils/restUtils.js';
////////////////////////////
const prisma = new PrismaClient();
const router = express.Router();

router.post('/', async (req, res) => {
  try {

    const data = validateWith(MessageSchema, req.body);
    const created = await prisma.message.create({ data });
    respondCreated(res, created);
  } catch (err) {
    respondError(res, err);
  }
});

export default router;
