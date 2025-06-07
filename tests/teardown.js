// tests/teardown.js
require('dotenv').config({ path: '.env.test' });

const { disconnectTestMongo } = require('./utils/testMongo');

module.exports = async () => {
  await disconnectTestMongo(); // Already drops DB and disconnects
};
