import express from 'express';
import users from './users.js';
import tcodes from './tcodes.js';
import messages from './messages.js';
import subscription from './subscription.js';

const router = express.Router();

router.use('/users', users);
router.use('/tcodes', tcodes);
router.use('/messages', messages);
router.use('/me', subscription);

export default router;
