// tests/utils/testMongo.js
const mongoose = require('mongoose');

async function connectToTestMongo() {
  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error('Missing test MONGO_URI');
  await mongoose.connect(uri);
}

async function disconnectTestMongo() {
  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error('Missing test MONGO_URI');

  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(uri); // Ensure connected before dropping
  }

  await mongoose.connection.dropDatabase();
  await mongoose.disconnect();
}

module.exports = {
  connectToTestMongo,
  disconnectTestMongo
};
