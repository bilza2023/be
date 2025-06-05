import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

router.post('/', async (req, res) => {
  try {
    const { content, tags, props, senderType, userId } = req.body;

    const message = await prisma.message.create({
      data: {
        userId: userId || null,
        senderType,
        content,
        tags,
        props
      }
    });

    res.json({ status: 'ok', message });
  } catch (err) {
    console.error("Error in POST /messages:", err);
    res.status(400).json({ error: 'Invalid request' });
  }
});

export default router;
