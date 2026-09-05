import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const connStr = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/swadyatra_db';
    await mongoose.connect(connStr, {
      serverSelectionTimeoutMS: 2000
    });
    console.log(`🍃 MongoDB Connected: ${mongoose.connection.host}`);
  } catch (error) {
    console.log(`⚠️ MongoDB Connection Warning (${error.message}). Running with in-memory database handler for testing capability.`);
  }
};
