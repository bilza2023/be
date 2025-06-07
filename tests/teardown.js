
// tests/teardown.js
require('dotenv').config({ path: '.env.test' });

const mongoose = require('mongoose');

module.exports = async () => {
  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error('Missing MONGO_URI in .env.test');

  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(uri);
  }

  // Wait if a drop is already in progress
  try {
    await mongoose.connection.dropDatabase();
  } catch (err) {
    console.warn('⚠️ dropDatabase failed — possibly already dropped:', err.message);
  }

  await mongoose.disconnect();
};
