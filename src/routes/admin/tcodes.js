// src/routes/admin/tcodes.js
import { createCrudRouter } from '../../utils/createCrudRouter.js';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const TcodeSchema = z.object({
  id: z.number(),
  tcode: z.string(),
  chapter: z.number(),
  exercise: z.string(),
  question: z.string(),
  type: z.string().optional(),
});

const router = createCrudRouter({
  model: prisma.tcode,
  schema: TcodeSchema,
  basePath: '/',
  routes: { get: true, post: true, put: true, delete: true }
});

export default router;
