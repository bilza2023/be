import express from 'express';
import { PrismaClient } from '@prisma/client';
import { respondOk, respondNotFound, respondError } from '../../utils/restUtils.js';

const prisma = new PrismaClient();
const router = express.Router();

router.get('/:id', async (req, res) => {
  try {
    const item = await prisma.tcode.findUnique({ where: { id: req.params.id } });
    if (!item) return respondNotFound(res);
    respondOk(res, item);
  } catch (err) {
    respondError(res, err);
  }
});

export default router;
