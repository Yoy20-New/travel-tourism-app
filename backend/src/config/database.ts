import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { env } from './env';

let mongoServer: MongoMemoryServer | null = null;

const connectDB = async (): Promise<void> => {
  try {
    let mongoUri = env.MONGODB_URI;

    if (env.IN_MEMORY_MONGO) {
      mongoServer = await MongoMemoryServer.create();
      mongoUri = mongoServer.getUri();
      console.log('🧪 Using in-memory MongoDB for development:', mongoUri);
    }

    await mongoose.connect(mongoUri, {});
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    if (env.NODE_ENV === 'production') {
      process.exit(1);
    } else {
      console.error('⚠️ Continuing without DB connection in non-production environment');
    }
  }
};

// Handle connection events
mongoose.connection.on('disconnected', () => {
  console.log('🔌 MongoDB disconnected');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB error:', err);
});

// Graceful shutdown for in-memory server
const shutdown = async () => {
  if (mongoServer) {
    await mongoServer.stop();
    mongoServer = null;
    console.log('🧪 In-memory MongoDB stopped');
  }
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
process.on('exit', shutdown);

export default connectDB;
