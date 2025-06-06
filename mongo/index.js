
import mongoose from 'mongoose';

// const MONGO_URI = 'mongodb://taleemAdmin:bils32611246950@mongo:27017/taleemDB?authSource=admin';
const MONGO_URI = 'mongodb://taleemAdmin:bils32611246950@localhost:27017/taleemDB?authSource=admin';

export async function connectToMongo() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  }
}
