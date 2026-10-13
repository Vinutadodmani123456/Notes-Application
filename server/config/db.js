const mongoose = require('mongoose');

/**
 * Connect to MongoDB database
 * Supports both local MongoDB Community Server and MongoDB Atlas URI
 */
const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/notenest';
    
    const conn = await mongoose.connect(mongoUri);

    console.log(`[MongoDB] Connected successfully to host: ${conn.connection.host}`);
    console.log(`[MongoDB] Database name: ${conn.connection.name}`);

    // Listen to connection errors after initial connection
    mongoose.connection.on('error', (err) => {
      console.error('[MongoDB Error]', err.message);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('[MongoDB] Disconnected from database.');
    });

    return conn;
  } catch (error) {
    console.error(`[MongoDB] Connection Failed: ${error.message}`);
    console.error('[MongoDB] Ensure MongoDB service is running locally or check MONGODB_URI in .env');
    // We let the caller decide or exit if necessary
    throw error;
  }
};

module.exports = connectDB;
