
// src/routes/admin/messages.js
import { createCrudRouter } from '../../utils/createCrudRouter.js';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const MessageSchema = z.object({
  id: z.number().optional(),
  userId: z.number().nullable(),
  senderType: z.string(),
  content: z.string(),
  tags: z.string().optional(),
  props: z.any().optional()
});

const router = createCrudRouter({
  model: prisma.message,
  schema: MessageSchema,
  basePath: '/',
  routes: { get: true, post: true, put: true, delete: true }
});

export default router;
