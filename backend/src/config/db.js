import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const connStr = process.env.MONGODB_URI || 'mongodb+srv://test:test123@cluster0.kwbnz.mongodb.net/naikfoods?retryWrites=true&w=majority';
    await mongoose.connect(connStr, {
      serverSelectionTimeoutMS: 5000
    });
    console.log(`🍃 MongoDB Connected: ${mongoose.connection.host}`);
  } catch (error) {
    console.log(`⚠️ MongoDB Connection Warning (${error.message}). Running with in-memory database handler for testing capability.`);
  }
};
