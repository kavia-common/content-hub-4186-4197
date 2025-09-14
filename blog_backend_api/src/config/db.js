const mongoose = require('mongoose');

/**
 * PUBLIC_INTERFACE
 * connectDB
 * Connects to MongoDB using environment variables provided by the orchestrator.
 */
async function connectDB() {
  /**
   * This is a public function.
   * Connect to MongoDB using MONGODB_URL and MONGODB_DB.
   */
  const mongoUrl = process.env.MONGODB_URL;
  const dbName = process.env.MONGODB_DB;

  if (!mongoUrl) {
    throw new Error('MONGODB_URL is not set. Please provide it via environment.');
  }

  const options = {
    dbName,
  };

  mongoose.set('strictQuery', true);

  await mongoose.connect(mongoUrl, options);
  // Basic connection events
  mongoose.connection.on('connected', () => {
    console.log(`MongoDB connected ${dbName ? 'to DB: ' + dbName : ''}`);
  });
  mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
  });
  mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
  });
}

module.exports = {
  connectDB,
};
