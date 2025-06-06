const dotenv = require('dotenv');
const mongoose = require('mongoose');


dotenv.config();


const MONGO_URI = process.env.MONGO_URI;
async function connectToMongo() {
  if (!MONGO_URI) {
    throw new Error('MONGO_URI is not defined');
  }

  await mongoose.connect(MONGO_URI);

  if (process.env.NODE_ENV !== 'test') {
    console.log(`✅ MongoDB connected: ${MONGO_URI}`);
  }
}

module.exports = connectToMongo;
