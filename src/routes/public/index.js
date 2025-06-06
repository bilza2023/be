import express from 'express';
import users from './users.js';
import tcodes from './tcodes.js';
import messages from './messages.js';
import subscription from './subscription.js';

const router = express.Router();

router.use('/users', users);         // Registration, login, profile
router.use('/tcodes', tcodes);       // Slide or lesson content
router.use('/messages', messages);   // User/system message logging
router.use('/me', subscription);     // Subscription check

export default router;
