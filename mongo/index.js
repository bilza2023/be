

const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config(); 

async function connectToMongo() {
  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error('MONGO_URI is not defined');
  await mongoose.connect(uri);
  if (process.env.NODE_ENV !== 'test') {
    console.log(`✅ Mongo connected: ${uri}`);
  }
}

module.exports = connectToMongo;
