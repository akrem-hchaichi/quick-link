import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import connectDB from './config/db';
import logger from './utils/logger';

const PORT = process.env.PORT || 3000;

// Log uncaught exceptions
process.on('uncaughtException', (error) => {
    logger.error('Uncaught Exception:', error);
    process.exit(1);
});

// Log unhandled promise rejections
process.on('unhandledRejection', (error) => {
    logger.error('Unhandled Rejection:', error);
    process.exit(1);
});

// Start server
connectDB().then(() => {
    app.listen(PORT, () => {
        logger.info(`Server running on ${PORT}`);
    });
});