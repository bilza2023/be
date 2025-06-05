// src/schema/zod.js
import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string().optional(),
  email: z.string().email(),
  passwordHash: z.string(),
  createdAt: z.date().optional()
});

export const TcodeSchema = z.object({
  id: z.string().optional(),
  tcode: z.string(),
  chapter: z.number(),
  exercise: z.string(),
  questionNo: z.number().optional(),
  sortOrder: z.number().optional(),
  slides: z.any()
});

export const MessageSchema = z.object({
  id: z.string().optional(),
  userId: z.string().optional(),
  senderType: z.string(),
  content: z.string(),
  tags: z.string().optional(),
  props: z.any().optional(),
  createdAt: z.date().optional()
});

export const SubscriptionSchema = z.object({
  id: z.string().optional(),
  userId: z.string(),
  tcodeId: z.string(),
  subscriptionType: z.string(),
  startDate: z.string().or(z.date()),
  durationDays: z.number(),
  status: z.string()
});
