const dotenv = require('dotenv');

// Load environment variables from .env
dotenv.config();

const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

// Initialize Server
const startServer = async () => {
  try {
    // Connect to database before listening
    await connectDB();

    const server = app.listen(PORT, () => {
      console.log(`===============================================`);
      console.log(`🚀 NoteNest Server running in ${process.env.NODE_ENV || 'development'} mode`);
      console.log(`🌐 API listening on http://localhost:${PORT}`);
      console.log(`📄 Health Check: http://localhost:${PORT}/api/health`);
      console.log(`📝 Notes Endpoint: http://localhost:${PORT}/api/notes`);
      console.log(`===============================================`);
    });

    // Graceful shutdown handling
    process.on('SIGINT', async () => {
      console.log('\nShutting down gracefully...');
      server.close(() => {
        console.log('HTTP server closed.');
        process.exit(0);
      });
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();
