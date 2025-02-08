import winston from 'winston';
import expressWinston from 'express-winston';

// Configure Winston logger
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
        winston.format.prettyPrint()
    ),
    transports: [
        // Log to console
        new winston.transports.Console(),
        // Log to file
        new winston.transports.File({ filename: 'logs/combined.log' }),
        // Log errors to a separate file
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    ],
});

// Middleware for logging HTTP requests
export const requestLogger = expressWinston.logger({
    winstonInstance: logger,
    meta: true, // Include metadata like req/res headers
    msg: 'HTTP {{req.method}} {{req.url}} - {{res.statusCode}} {{res.responseTime}}ms',
    colorize: true,
});

// Middleware for logging HTTP errors
export const errorLogger = expressWinston.errorLogger({
    winstonInstance: logger,
});

export default logger;