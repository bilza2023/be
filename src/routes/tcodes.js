import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// List all tcodes (optionally filtered)
router.get('/', async (req, res) => {
  const tcodes = await prisma.tcode.findMany({
    orderBy: { sortOrder: 'asc' }
  });
  res.json(tcodes);
});

// Get one tcode by ID
router.get('/:id', async (req, res) => {
  const tcode = await prisma.tcode.findUnique({
    where: { id: req.params.id }
  });
  if (!tcode) return res.status(404).json({ error: 'Tcode not found' });
  res.json(tcode);
});

export default router;
