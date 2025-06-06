import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/taleem';

export async function connectToMongo() {
  try {
    // await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    await mongoose.connect(MONGO_URI); 
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  }
}
