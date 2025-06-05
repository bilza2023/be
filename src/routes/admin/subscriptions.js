
// src/routes/admin/subscriptions.js
import { createCrudRouter } from '../../utils/createCrudRouter.js';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const SubscriptionSchema = z.object({
  id: z.number().optional(),
  userId: z.number(),
  tcodeId: z.string(),
  subscriptionType: z.string(),
  startDate: z.string().or(z.date()),
  durationDays: z.number(),
  status: z.string()
});

const router = createCrudRouter({
  model: prisma.subscription,
  schema: SubscriptionSchema,
  basePath: '/',
  routes: { get: true, post: true, put: true, delete: true }
});

export default router;
