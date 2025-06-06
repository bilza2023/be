// tests/teardown.js
const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.test' }); // Load test env

module.exports = async () => {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    throw new Error('MONGO_URI not found in .env.test');
  }

  await mongoose.connect(uri);                     // Reconnect
  await mongoose.connection.db.dropDatabase();     // Drop test DB
  await mongoose.disconnect();                     // Exit cleanly
};
