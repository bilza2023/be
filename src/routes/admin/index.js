// src/routes/admin/index.js
import express from 'express';
import tcodes from './tcodes.js';
import messages from './messages.js';
import users from './users.js';
import subscriptions from './subscriptions.js';

const router = express.Router();

router.use('/tcodes', tcodes);
router.use('/messages', messages);
router.use('/users', users);
router.use('/subscriptions', subscriptions);

export default router;
