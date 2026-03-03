import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3001;

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/batsaikhan_info'

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1); // Exit with failure
  }
};

// Optional: Handle connection events for debugging
mongoose.connection.on('disconnected', () => console.log('DB Disconnected'));

