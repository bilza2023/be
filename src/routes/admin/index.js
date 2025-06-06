// src/routes/admin/index.js
const express = require('express');
const tcodes = require('./tcodes');
const messages = require('./messages');
const users = require('./users');
const subscriptions = require('./subscriptions');

const router = express.Router();

router.use('/tcodes', tcodes);
router.use('/messages', messages);
router.use('/users', users);
router.use('/subscriptions', subscriptions);

module.exports = router;
