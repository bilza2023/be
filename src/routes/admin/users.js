
// src/routes/admin/users.js
import { createCrudRouter } from '../../utils/createCrudRouter.js';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const UserSchema = z.object({
  id: z.number().optional(),
  email: z.string().email(),
  passwordHash: z.string(),
  createdAt: z.date().optional()
});

const router = createCrudRouter({
  model: prisma.user,
  schema: UserSchema,
  basePath: '/',
  routes: { get: true, post: false, put: false, delete: false }
});

export default router;
