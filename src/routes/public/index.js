const express = require('express');
const users = require('./users');
const tcodes = require('./tcodes');
const messages = require('./messages');
const subscription = require('./subscription');


const router = express.Router();

router.use('/users', users);         // Registration, login, profile
router.use('/tcodes', tcodes);       // Slide or lesson content
router.use('/messages', messages);   // User/system message logging
router.use('/me', subscription);     // Subscription check
module.exports =  router;
