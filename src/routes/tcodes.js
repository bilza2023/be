// src/routes/tcodes.js
import { createCrudRouter } from '../utils/createCrudRouter.js';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const TcodeSchema = z.object({
  id: z.number(),
  tcode: z.string(),
  chapter: z.number(),
  exercise: z.number(),
  question: z.string(),
  // Add more fields as per your model
});

const router = createCrudRouter({
  model: prisma.tcode,
  schema: TcodeSchema,
  basePath: '/',
  routes: { get: true, post: false, put: false, delete: false }
});

export default router;
